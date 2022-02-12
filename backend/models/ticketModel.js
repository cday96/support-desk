const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		product: {
			type: String,
			required: [true, "Please select a product"],
			enum: [
				"Campaign Landing Page",
				"Responsive Website",
				"Basic Ecommerce Website",
				"Social Media Management",
			],
		},
		description: {
			type: String,
			required: [true, "Please enter a description of the issue"],
		},
		status: {
			type: String,
			required: true,
			enum: ["New", "Active", "Closed"],
			default: "New",
		},
	},
	{
		// Apply timestamps to all fields
		timestamps: true,
	}
)

// Export the model giving it a name and what schema to use for it
module.exports = mongoose.model("Ticket", ticketSchema)
