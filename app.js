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
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée. Vous pouvez essayer une autre url'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node demarre sur : http://localhost:${port}`))