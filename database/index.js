//database connection //

const mongoose = require(`mongoose`)
// use async before using await //
async function connectdatabase(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("database connection successfully.") 
}

// to export file in other file //

module.exports = connectdatabase