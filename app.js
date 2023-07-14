const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app  = express()
const port = 3000
app 
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

//Ici seront les endpoints
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)

app.listen(port, () => console.log(`Notre application Node demarre sur : http://localhost:${port}`))