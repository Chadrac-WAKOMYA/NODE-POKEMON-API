const validTypes = ['Plantes','Poison','Feu','Eau','Vol','Normal','Electrik','Fée']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          notEmpty : {msg: 'Le champ nom ne doit pas être vide'},
          notNull : {msg: 'Le nom est une propriété requise'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt : {msg: 'Utilisez uniquement les nombres entiers pour les points de vie'},
          notNull : {msg: 'Les points de vie sont une propriété requise'},
          min : {
            args: [0],
            msg: `La valeur des points de vie doit être supérieur ou égale à 0`
          },
          max : {
            args: [99],
            msg: `La valeur des points de vie doit être inférieur ou égale à 999`
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt : {msg: 'Utilisez uniquement les nombres entiers pour les points de dégâts'},
          notNull : {msg: 'Les points de dégâts soint une propriété requise'},
          min : {
            args: [0],
            msg: `La valeur des points de dégâts doit être supérieur ou égale à 0`
          },
          max : {
            args: [99],
            msg: `La valeur des points de dégâts doit être inférieur ou égale à 99`
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          isURL : {msg: `Utilisez uniquement les URL valides pour l'image`},
          notNull : {msg: `L'image est une propriété requise`}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types',types.join())
        },
        validate: {
          isTypesValid(value){
            if(!value){
              throw new Error('Un pokémon doit avoir au moins un type');
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokémon ne doit pas avoir plus de trois types')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                // throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
                console.log('Okay')
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }