'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('books', {
            book_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            book_name: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            year: {
                type: Sequelize.STRING
            },
            qtt: {
                type: Sequelize.INTEGER
            },
            detals: {
                type: Sequelize.STRING
            },
            cat_id: {
                type: Sequelize.INTEGER
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('books');
    }
};