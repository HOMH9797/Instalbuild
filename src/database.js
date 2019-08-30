const mongoose = require('mongoose');

 process.env.URI =  process.env.URI || 'mongodb://localhost:27017/construccion';

mongoose.connect(process.env.URI, { useCreateIndex: true, useNewUrlParser: true })
            .then(db => console.log('Db is connected'))
            .catch(err => console.error(err));


module.exports = mongoose;