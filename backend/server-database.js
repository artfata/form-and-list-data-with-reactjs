const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$B1smillah',
  database: 'my_database'
})

function query(objectSql){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      connection.query(objectSql, (err, results) => {
        if(err) reject(err)
        resolve(results)
      })
    }, 0)
  })
}


function isConnect(){
  connection.connect((error) => {
    if(error){
      console.log('error connecting to database')
    } else {
      console.log(`connected to database`)
    }
  }
)

}


exports.query = query
exports.isConnect = isConnect