// const { } = require('../constants')
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
	category: {
		type: String,
		default: "CUSTOM"
	},
	subCategory: {
		type: String
	},
	name: {
		type: String,
		required: true
	}
});

module.exports = Item = mongoose.model("item", ItemSchema);
