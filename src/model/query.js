
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuerySchema = new Schema({

    contactEmail: {

        type: Schema.Types.String,

        required: true

    },

    queryData: {

        type: Schema.Types.String,

        required: true

    }

});

const Query = mongoose.model('Query', QuerySchema);

module.exports = {Query};