const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon===null){
          const message = `Le pokemon demandé n'existe pas. Essayez avec un autre identifiant`
          const statusCode = '404'
          return res.status(404).json({statusCode, message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `Le pokemon n'a pas pu être récupérée. Réessayez un peu plus tard`
        const statusCode = '500'
        res.status(500).json({statusCode, message, data: error})
      })
  })
}