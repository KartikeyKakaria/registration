const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => {
        console.log('connected to db')
    })
    .catch((e) => {
        console.log(e);
    })