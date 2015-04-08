#!/usr/bin/env node

var path = require('path');

var fs = require('fs-extra');
var through = require('through2');
var jsonStream = require('JSONStream');
var concat = require('concat-stream')

var catalogFileStream = fs.createReadStream(path.resolve(__dirname, '../catalog.json'));
var bowerFile = require(path.resolve(__dirname, '../bower.json'));
var bowerDeps = bowerFile.dependencies;

// IDEA!!!
// module.exports = makeObject({
//   packages: somePackageStream,
//   elements: elementsStream,
//   tags tagsStream
// });//.pipe(process.stdout);



console.log(bowerDeps);


/*
  
  OUTPUT:
  {
    "name":"core-elements",
    "version":"1.0.0",
    "title":"Core Elements",
    "description":"The description from the bower.json for the package.",
    "elements":["core-example"]
  }
  
 */
catalogFileStream
  .pipe(jsonStream.parse('packages'))
  .pipe(through.obj(function (chunk, enc, done) {
    
    // Add version
    console.log(chunk);
    
    done();
  }))
  .pipe(through.obj(function (chunk, enc, done) {
    
    // Get packages bower.json
    
    done();
  }))
  .pipe(process.stdout);

/*
{
  "packages": [
    {
      "name":"core-elements",
      "title":"Core Elements"
    },
    {
      "name":"paper-elements",
      "title":"Paper Elements"
    }
  ]
}
 */
 
 