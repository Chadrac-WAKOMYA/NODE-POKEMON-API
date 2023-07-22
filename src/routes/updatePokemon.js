const { Pokemon } = require('../db/sequelize')
  
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
      const message = `Le pokemon n'a pas pu être modifié. Réessayez un peu plus tard`
      const statusCode = '500'
      res.status(500).json({statusCode, message, data: error})
    })
  })
}