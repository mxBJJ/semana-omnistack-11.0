const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const helper_id = request.headers.authorization;

        const incidents = await connection('dogs')
        .where('helper_id', helper_id)
        .select('*');

        return response.json(incidents);
    }
}