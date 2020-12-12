
const express = require('express');

const mongoose = require('mongoose');

const {Contact} = require('./model/contact');

const {Query} = require('./model/query');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/kulkarniMani', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => console.error('connection error:'));

db.once('open', () => console.log('Connected to Mongo DB'));

app.post('/createQuery',  async (request, response) => {

    try {

        const newData = {email: request.body.email, query: request.body.query}

        // Creates a new query and adds it to the database in Query collection.
        const newQuery = await Query.create({contactEmail: newData.email, queryData: newData.query});

        // Checking if the contact already exists in database and if it is a new contact,
        // adds it the Contact collection.
        if(

            !(await Contact.exists({emailId: newData.email}))

        ) {

            console.log("New Contact");

            const newContact = await Contact.create(
                {
                    emailId: newData.email,
                    queries: newData.query
                });

            console.log(newContact)

        } else {

            console.log("Existing Contact");

            const updateContact = await Contact.findOneAndUpdate(
                {
                    emailId: newData.email
                }, {
                    $push: {queries: newData.query}
                }

            );

        }

        console.log(newQuery)

        response.send('New query added successfully.');

    } catch (error) {

        return response.sendStatus(400);

    }
});

app.listen(8080, () => console.log('Kulkarni Mani Server is up'))