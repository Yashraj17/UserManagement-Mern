const mongoose = require('mongoose')

const connectDb = async ( CONNECTION_URL) =>{
    try {
        await mongoose.connect(CONNECTION_URL)
        console.log('connection successfull !!');
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = connectDb;