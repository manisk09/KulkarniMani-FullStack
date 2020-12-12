
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({

    emailId: {

        type: Schema.Types.String,

        required: true

    },

    queries: {

        type: Schema.Types.Array
        /*
        queryId: {

            type: Schema.Types.Number,

            default: 1,

        },

        queryValue: {

            type: Schema.Types.String,

        } */
    }

});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = {Contact};