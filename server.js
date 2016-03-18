'use strict'

const Hapi = require('hapi');

require('env2')('./config.env');


const fs = require('fs');
var AWS = require('aws-sdk');

var s3opts = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-1'
}

const s3 = new AWS.S3( {params:{Bucket :process.env.BUCKET}});




const server = new Hapi.Server();

server.connection({
  port: 3000
});

server.register(require('inert'), (err) => {


  server.route([{

    method: 'GET',
    path: '/',
    handler: (request, reply) => {

      reply.file('form.html');
    }
  }, {
    method: 'POST',
    path: '/upload',
    config: {

      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },

      handler: (request, reply) => {
        var data = request.payload;

        console.log(' DATA', data.file.hapi);
        if ((data.file)) {
          var name = data.file.hapi.filename;
          var path = __dirname + "/uploads/" + name;
          // creates a local instance of the file from which a stream can be read.
          var file = fs.createWriteStream(path);



          file.on('error', function(err) {
            console.error(err)
          });

          data.file.pipe(file);

          data.file.on('end', function(err) {
            var Stream = fs.createReadStream(path);
            var params = { Key: name,    Body: Stream  }
            s3.upload(params, function(err, data) {
              if (err) {
                console.log("Error uploading data: ", err);
              } else {
                console.log("Successfully uploaded data to myBucket/myKey");
								fs.unlink(path, function(err) {
	                if (err)
	                  console.error(err);
	                reply.file('form.html')
	              });
              }
            })
          })

      	}

      }
    }
  }, {
    method: 'POST',
    path: '/getfile',
    handler: (request, reply) => {
      var fileName = request.payload.file;
      var path = __dirname + "/downloads/" + fileName;

      var params = {
        Bucket: process.env.BUCKET,
        Key: fileName
      };
      var file = fs.createWriteStream(path);
      var download = s3.getObject(params).createReadStream().pipe(file);
      console.log('DOWNLOAD', download);
      reply.file('form.html');
    }

  }]);

});


server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
