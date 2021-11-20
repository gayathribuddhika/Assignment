const mysql = require('mysql');


// connect to the mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_registration',
    port: 3306
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL Database');
  });

module.export = connection;