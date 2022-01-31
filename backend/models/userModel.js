const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		// Apply timestamps to all fields
		timestamps: true,
	}
)

// Export the model giving it a name and what schema to use for it
module.exports = mongoose.model("User", userSchema)
