const {
    Schema,
    model
} = require('mongoose');

const taskschema = new Schema({
    tittle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

})

module.exports = model('tasks', taskschema)