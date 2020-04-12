const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const { name, email, phone, city, uf } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('helpers').insert({
            id,
            name,
            email,
            phone,
            city,
            uf
        });
        
        return response.json({ id });
    },
    async index(request, response) {
        const helpers = await connection('helpers').select('*');
        
        return response.json(helpers);
    }
}