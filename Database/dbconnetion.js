import { MongoClient } from "mongodb";

// Connection URL
const client = new MongoClient('mongodb://localhost:27017');

client.connect().then(()=>{
    console.log('Database Connected Successfully To Server');
}).catch(()=>{
    console.log('Database Error');
})


// Database Name
export const db = client.db('mongodb1');
