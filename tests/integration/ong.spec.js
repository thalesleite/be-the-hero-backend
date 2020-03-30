const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    // run migrations(create tables) before the tests
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    // close connection with database
    afterAll( async () => {
        await connection.destroy();
    });
    
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato.apad@email.com",
                whatsapp: "11389809039",
                city: "Sao Paulo",
                uf: "SP"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });  
});