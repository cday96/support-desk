const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./Middleware/errorMiddleware")
const PORT = process.env.PORT || 5000

const app = express()

// Init Express Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello" })
})

// Routes for users
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
