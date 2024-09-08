// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to env file')
// }

// client = new MongoClient(uri, options)
// clientPromise = client.connect()


// export default clientPromise


import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to the environment variables');
}
let client;
let clientPromise;
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}
export default clientPromise;
