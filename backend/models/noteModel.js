const mongoose = require("mongoose")

const noteSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Ticket",
		},
		text: {
			type: String,
			required: [true, "Please enter your note"],
		},
		isStaff: {
			type: Boolean,
			default: false,
		},
		staffId: {
			type: String,
		},
	},
	{
		// Apply timestamps to all fields
		timestamps: true,
	}
)

// Export the model giving it a name and what schema to use for it
module.exports = mongoose.model("Note", noteSchema)
