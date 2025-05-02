const mongoose = require('mongoose')
const schema = mongoose.Schema//mongoose is a object which contain schema class

const blogSchema = new schema({
    title :{
        type : String,
    
    },
    subtitle :{
        type : String
    },
    description :{
        type : String
    },
    image :{
        type : String
    }

})

const blog = mongoose.model('blog',blogSchema)//'model' is the name of table or name of model which store 
                                               //blogSchema
module.exports = blog