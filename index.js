

// // username:emaJhon
// // password: 1r77xPo9d53nO2fs



// const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wwdr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // client.connect(err => {
// //     const collection = client.db("test").collection("devices");
// //     console.log("connected")
// //     // perform actions on the collection object
// //     client.close();
// // });




//         // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ns9gc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//         // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//         //         // update data
//         //         app.get('user/:id', async (req, res) => {
//         //             const id = req.params.id;
//         //             const query = { _id: ObjectId(id) };
//         //             const result = await userCollection.findOne(query);
//         //             res.send(result);
//         //         })

//         //         // POST user: add anew user
//         //         app.post('/user', async (req, res) => {
//         //             const newUser = req.body;
//         //             console.log('add', newUser);
//         //             const result = await userCollection.insertOne(newUser);
//         //             res.send(result);
//         //         });

//         //         // put user
//         //         app.put('/user/:id', async (req, res) => {
//         //             const id = req.params.id;
//         //             const updatedUser = req.body;
//         //             const filter = { _id: ObjectId(id) }
//         //             const options = { upsert: true };
//         //             const updatedDoc = {
//         //                 $set: {
//         //                     name: updatedUser.name,
//         //                     email=updatedUser.email
//         //                 }
//         //             }
//         //             const result = await userCollection.updateOne(filter, updatedDoc, options);
//         //             res.send(result);
//         //         })
//         //         //delete a user
//         //         app.delete('/user/:id', async (req, res) => {
//         //             const id = req.params.id;
//         //             const query = { _id: ObjectId(id) };
//         //             const result = await userCollection.deleteOne(query);
//         //             res.send(result);

//         //         })



//         //         // const user = { name: 'Romana Eshita', email: 'eshita@gmail.com' };
//         //         // const result = await userCollection.insertOne(user);
//         //         // console.log(`A document was inserted with the _id: ${result.insertedId}`);



const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
// const ObjectId = require('monodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i26oo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("emaJohn").collection("product");
//     console.log('connected');
//     // perform actions on the collection object
//     client.close();
// });
async function run() {
    try {
        await client.connect();
        const productCollection = client.db("emaJohn").collection("product");
        console.log('connected')
        //get user
        app.get('/product', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            const query = {};
            const cursor = productCollection.find(query);
            let products;
            if (page || size) {
                products = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                products = await cursor.toArray();
            }

            // const products = await cursor.limit(10).toArray();
            res.send(products);
        });

        // For pagination

        app.get('/productCount', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const count = await productCollection.estimatedDocumentCount();
            // const products = await cursor.limit(10).toArray();
            res.send({ count });
        });
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
