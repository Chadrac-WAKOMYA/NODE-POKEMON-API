const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon===null){
        const message = `Le pokemon demandé n'existe pas. Essayez avec un autre identifiant`
        const statusCode = '404'
        return res.status(404).json({statusCode, message})
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error => {
      const message = `Le pokemon n'a pas pu être supprimé. Réessayez un peu plus tard`
      const statusCode = '500'
      res.status(500).json({statusCode, message, data: error})
    })
  })
}