const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://vishmeth:vishmeth@cluster0.ehnxsjc.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connect!");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No Database Found!!';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
