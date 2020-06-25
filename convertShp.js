// shp -> geojson

var fs = require('fs')
var shp = require('shapefile')
var jf = require('jsonfile')
var shpPath = './data/shp/'
var geojsonPath = './data/geojson/'

const files = fs.readdirSync( shpPath )
console.log( files )

;( async () => {
    console.log('do de ding')
    for ( let i = 0; i < files.length; i ++ ) {
        const fileName = files[i]
        const srcPath = `${shpPath}${fileName}`
        console.log(`${srcPath}`)

        const data = await new Promise( resolve => {
            shp.open( srcPath )
                .then( async (source) => {
                    console.log(`\tReading...`)
                    const data = []
                    let iBatch = 0
                    let result
                    do {
                        console.log(`\t${iBatch++}`)
                        result = await source.read( srcPath )
                        const value = result.value
                        data.push( value )
    
                        if ( result.done ) {
                            return resolve( data )
                        }
                    } while ( ! result.done )
                } )
        })

        const outPath = `${geojsonPath}${fileName.replace('.shp', '.json')}`
        console.log(`\tWriting ${ outPath }`)
        jf.writeFile( outPath, data )

    }
})()
