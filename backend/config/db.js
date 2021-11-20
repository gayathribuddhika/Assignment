const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/User_Registration",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    }).then(
        () => { console.log('DB Connected Successfully') },
        err => { console.log('Error in DB Connection' + err) }
    );
