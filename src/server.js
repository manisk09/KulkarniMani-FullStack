const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const {Contact} = require('./model/contact');

const {Query} = require('./model/query');

const app = express();

app.use(express.json());

// Using build folder as static files on the root domain and serve them up.
app.use(express.static('build'));

const connection = "mongodb+srv://mkulk1@unh.newhaven.edu:mani@messi143@kulkarniMani/kulkarniMani?retryWrites=true&w=majority";

mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true});

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

// When an unknown request comes through, send it the React app (used with React router)
app.get('/*', (request, response) =>{

    return response.sendFile(path.join(__dirname + '/../build/index.html'));

});

app.listen(process.env.PORT || 8080, () => console.log('Kulkarni Mani Server is up'))