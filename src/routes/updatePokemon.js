const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')

module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon===null){
          const message = `Le pokemon demandé n'existe pas. Essayez avec un autre identifiant`
          const statusCode = '404'
          return res.status(404).json({statusCode, message})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({statusCode:400, message: error.message, data: error})
      }
      const message = `Le pokemon n'a pas pu être modifié. Réessayez un peu plus tard`
      res.status(500).json({statusCode: 500, message, data: error})
    })
  })
}