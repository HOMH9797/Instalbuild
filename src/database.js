const mongoose = require('mongoose');

 process.env.URI;

mongoose.connect(process.env.URI, { useCreateIndex: true, useNewUrlParser: true })
            .then(db => console.log('Db is connected'))
            .catch(err => console.error(err));


module.exports = mongoose;