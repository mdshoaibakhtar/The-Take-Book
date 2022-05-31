const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mdshoaib:akhtar@cluster0.cxuqgao.mongodb.net/TheNoteBook?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log('connected to mongo successfully');
    }).catch((e) => {
        console.log('something went wrong, contact your developer');
        console.log(e);
    })
}

module.exports = connectToMongo;