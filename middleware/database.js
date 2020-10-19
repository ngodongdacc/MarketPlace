var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');

//===== db connection =====

// var config = {
//   username:'qtdatavn',
//   password:'qtdata@2020',
//   host:'118.69.32.128',
//   port:6022,
//   // dstHost:'mongodb://192.168.1.4:27017/marketplace',
//   dstPort:6022,
//   localHost:'127.0.0.1',
//   // localPort: 27017
// };

// var server = tunnel(config, function (error, server) {
//   if(error){
//       console.log("SSH connection error: " + error);
//   }
//   // console.log("connect ssh success", server);
//   mongoose.connect('mongodb://192.168.1.4:27017/marketplace',options)
//     var db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'DB connection error:'));
//     db.once('open', function() {
//         // we're connected!
//         console.log("DB connection successful");
//     });
// });

//Thiết lập một kết nối mongoose mặc định
var mongoDB =  process.env.MONGOURL || 'mongodb://ngodongdac:dong300595@ds213209.mlab.com:13209/marketplace';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, 
  useFindAndModify: false
  // autoIndex: false, // Don't build indexes
  // poolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
  // useMongoClient: true
};


mongoose.connect(mongoDB, options).then(
  () => { 
      console.log("connect mongodb success!")
   },
  err => { 
    console.log("connect mongodb fail!", err)
   }
);

module.exports = mongoose