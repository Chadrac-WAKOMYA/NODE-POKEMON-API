const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `Le pokemon n'a pas pu être ajouté. Réessayez un peu plus tard`
        const statusCode = '500'
        res.status(500).json({statusCode, message, data: error})
      })
  })
}