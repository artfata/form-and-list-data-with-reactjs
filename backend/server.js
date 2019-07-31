const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./server-database')

app.use(cors())
app.use(express.json())

// get data
app.get('/get-data', async (req, res) => {
  try {
    const dataUser = await db.query({
      sql: `SELECT
          u.id,
          u.full_name,
          u.address,
          u.place_of_birth_id,
          u.last_education,
          c.name AS place_of_birth,
          date_format(u.date_of_birth, '%d %M %Y') AS data_of_birth,
          u.phone_number,
          u.religion
        FROM users u
        LEFT JOIN cities c
          ON u.place_of_birth_id = c.id`
    })

    let data = [];
    for(let x=0; x<dataUser.length; x++){
      data[x] = {
        hobbies: await db.query({
          sql: `SELECT 
              h.name
            FROM users_hobbies uh
            LEFT JOin hobbies h 
              ON uh.hobby_id = h.id 
            WHERE uh.biodata_id = ${dataUser[x].id}`
        }),
        ...dataUser[x], 
      }
    }

    res.send(data)
  } catch (ex) {
    res.status(400).send('ups, kesalahan terjadi')
    console.log(ex)
  }
})

// get data by id
app.get('/get-data/:id', async (req, res) => {
  try {
    const dataUser = await db.query({
      sql: `SELECT
          u.id,
          u.full_name,
          u.address,
          u.place_of_birth_id,
          u.last_education,
          c.id AS place_of_birth_id,
          date_format(u.date_of_birth, '%d-%m-%Y') AS data_of_birth,
          u.phone_number,
          u.religion
        FROM users u
        LEFT JOIN cities c
          ON u.place_of_birth_id = c.id
        WHERE u.id = ?`,
      values: req.params.id
    })

    let data = [];
    for(let x=0; x<dataUser.length; x++){
      data[x] = {
        ...dataUser[x],        
        hobbies: await db.query({
          sql: `SELECT 
              h.id AS hobby_id
            FROM users_hobbies uh
            LEFT JOin hobbies h 
              ON uh.hobby_id = h.id 
            WHERE uh.biodata_id = ${dataUser[x].id}`
        }),
      }
    }

    res.send(data[0])
  } catch (ex) {
    res.status(400).send('ups, kesalahan terjadi')
    console.log(ex)
  }
})


// get cities
app.get('/get-cities-data', async (req, res) => {
  try {
    const data = await db.query({
      sql: `SELECT * FROM cities`
    })

    res.send(data)
  } catch (ex) {
    res.status(404).send('ups, kesalahan terjadi')
    console.log(ex)
  }
})

// get hobbies
app.get('/get-hobbies-data', async (req, res) => {
  try {
    const data = await db.query({
      sql: `SELECT * FROM hobbies`
    })

    res.send(data)
  } catch (ex) {
    res.send('ups, kesalahan terjadi')
    console.log(ex)
  }
})

// create data
app.post('/create-data', async (req, res) => {
  try {
    const { 
      full_name, date_of_birth, place_of_birth_id,
      phone_number, address, last_education, religion,
      hobbies
    } = req.body

    const userData = await db.query({
      sql: `INSERT INTO users SET ?`,
      values: {
        full_name: full_name,
        date_of_birth: date_of_birth,
        place_of_birth_id: place_of_birth_id,
        phone_number: phone_number,
        address: address,
        last_education: last_education,
        religion: religion
      }
    })

    for(let x = 0; x < hobbies.length; x++){
      await db.query({
        sql: `INSERT INTO users_hobbies SET ?`,
        values: {
          biodata_id: userData.insertId,
          hobby_id: hobbies[x]
        }
      })
    }

    res.send('data berhasil ditambahkan')
  } catch (ex) {
    res.status(404).send('ups, kesalahan terjadi')    
    console.log(ex)
  }
})

// update data
app.put('/update-data/:id', async (req, res) => {
  try {
    
  } catch (ex) {
    res.status(404).send('ups, kesalahan terjadi')    
    console.log(ex)
  }
})

// delete data
app.delete('/delete-data/:id', async (req, res) => {
  try {

    await db.query({
      sql: `DELETE FROM users_hobbies WHERE biodata_id = ?`,
      values: req.params.id
    })
    
    await db.query({
      sql: `DELETE FROM users WHERE id = ?`,
      values: req.params.id
    })

    res.send('data berhasil di hapus')
  } catch (ex) {
    res.status(404).send('ups, kesalahan terjadi')    
    console.log(ex)
  }
})

// create server
app.listen(1000, function(){
  console.log('app running on port 1000')
  db.isConnect()
})