const express = require("express");
const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const objId = mongoDB.ObjectID;

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`your app is running with port no: ${port}`));
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";

//mongodb atlas url link:-
// const atlasUrl = 'mongodb+srv://snehit_t:cmxXDK8le7Yzp2N5@cluster-storage.3iznn.mongodb.net/student_db?retryWrites=true&w=majority';

app.get("/", (req,res) => {
    // res.send("Sample page from server");
})

////-----> using callback {.then()}  [Error first callback]
// app.get("/users", (req, res) => {
//     mongoClient.connect(dbUrl, (err, client) => {
//         if(err) throw err;
//         let db = client.db("db_login");
//         db.collection("clients")
//           .find()
//           .toArray()
//           .then((data) => {
//             res.status(200).json(data)
//         });
//     });
// });

app.get("/users", async (req, res) => {
    try{
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("student_db");
        let data = await db.collection("users").find().toArray();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
});



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://snehit_t:<password>@cluster-storage.3iznn.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
