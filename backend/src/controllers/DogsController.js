const connection = require('../database/connection');

module.exports = {

    async create(request, response){

        const { title, description } = request.body;
        const helper_id = request.headers.authorization;

        let [ id ] = await connection('dogs').insert({
            title,
            description,
            helper_id
        });

        return response.json({ id });
    },

    async index(request, response){
        const { page = 1 } =  request.query;
        const [ count ] = await connection('dogs').count();

        console.log(count)

        const dogs = await connection('dogs')
        .limit(5)
        .offset((page - 1) * 5)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(dogs);
    },

    async delete(request, response){
        const { id } = request.params;
        const helper_id = request.headers.authorization;

        const dog = await connection('dogs')
        .where('id',id)
        .select('helper_id')
        .first();

        if (helper_id != dog.helper_id){
            return response.status(401).json({ error: "Operation not authorized."});
        }

        await connection('dogs').where('id', id).delete();
        return response.status(204).send();
    }
}