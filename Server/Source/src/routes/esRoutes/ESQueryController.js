const ESQueryServices = require('../../services/ESQueryServices');
const reqResponse = require('../../cors/responseHandler');
const { validationResult } = require('express-validator');
const staticResult = require('../../data/query_resp-01.json');

module.exports = {
	searchES: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(402).send(reqResponse.errorResponse(402));
		}

		// let data = req.body;
		let params = req.params;
		let query = req.query;

		let data = staticResult;

		try {
			let result = await ESQueryServices.searchES(data, params, query);
			res.status(201).send(reqResponse.successResponse(201, "Search has results", data));
		} catch (error) {
			console.error(error);
			res.status(502).send(reqResponse.errorResponse(502));
		}
	},
}


