const mongoose = require('mongoose')
const schema =mongoose.Schema

const blogSchema = new schema({
    title :{
        type : String,
        unique : true
    },
    subtitle :{
        type : String
    },
    description :{
        type : Text
    },
    image :{
        type : String
    }

})

const blog = mongoose.model('blog',blogschema)
module.exports = blog