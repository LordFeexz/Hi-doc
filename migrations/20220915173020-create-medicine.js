'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Medicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      DiseaseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Diseases',
          },
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Medicines');
  }
};