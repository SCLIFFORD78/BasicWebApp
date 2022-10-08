import { MongoClient } from "mongodb"
//import { DB_URI } from '$env/static/private';
const DB_URI = "mongodb://localhost/donation"
const client = new MongoClient(DB_URI)
await client.connect()
const Donations = client.db('donations') // select database
const Candidates = await Donations.collection('candidates').find().toArray()

export default Candidates// select database