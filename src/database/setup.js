//SETUP MONGOOSE
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/event-management'

module.exports = function () {
//Connect App To Database
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log(`database connection successful`)
    }
})
}

