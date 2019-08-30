const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/construccion';

mongoose.connect(URI, { useCreateIndex: true, useNewUrlParser: true })
            .then(db => console.log('Db is connected'))
            .catch(err => console.error(err));


module.exports = mongoose;