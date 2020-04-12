const connection = require('../database/connection');
module.exports = {

    async create(request, response){
        const { id } = request.body;
        
        const helper = await connection('helpers')
        .where('id',id)
        .select('name')
        .first();

        if(!helper){
            return response.status(400).json({ error: "No helper found with this ID." });
        }

        return response.json(helper);
    }
}