const { LIST_USER_ROLES } = require('../constants')

const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	users: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "user"
			},
			role: {
				type: String,
				default: LIST_USER_ROLES.VIEWER
			}
		}
	],
	title: {
		type: String,
		required: true
	},
	creationTimeStamp: {
		type: Date,
		default: Date.now
	},
	lastUpdateTimeStamp: {
		type: Date,
		default: Date.now
	},
	items: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "item"
			},
			units: {
				type: String,
				default: "units" // grams | ml
			},
			quantity: {
				type: Number,
				default: 0.0
			},
			checkedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "user"
			}
			// isChecked: {
			// 	type: Boolean,
			// 	default: false
			// }
		}
	]
});

module.exports = List = mongoose.model("list", ListSchema);
