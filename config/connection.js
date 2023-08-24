const { connect, connection } = require('mongoose');


const connectionString = 'mongodb://127.0.0.1:27017/studentsDB';//make sure to change db name

connect(connectionString);

module.exports = connection;