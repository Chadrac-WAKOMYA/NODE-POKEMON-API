const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app  = express()
const port = 300
app 
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

//Ici seront les endpoints
require('./src/routes/findAllPokemons')(app)

app.listen(port, () => console.log(`Notre application Node demarre sur : http://localhost:${port}`))