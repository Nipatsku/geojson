// shp -> geojson

var fs = require('fs')
var shp = require('shapefile')
var jf = require('jsonfile')
var shpPath = './data/shp/'
var geojsonPath = './data/geojson/'

fs.readdir( shpPath , (err, files) => {
    files.forEach(file => {
      console.log(file);
      const srcPath = `${shpPath}${file}`
      shp.open( srcPath )
          .then(source => source.read()
              .then(function log(result) {
                  if (result.done) return;
                  console.log(result.value);
                  return source.read()
                      .then( r => {
                          console.log( r )
                          const outPath = `${geojsonPath}${file.replace('.shp', '.json')}`
                          jf.writeFile(outPath, r, function() {
                          })
                      } )
              }))
          .catch(error => console.error(error.stack));
    });
});


