const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./Middleware/errorMiddleware")
const connectDB = require("./config/db")
const cors = require("cors")
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

app.use(
	cors({
		origin: "http://localhost:3000",
		optionsSuccessStatus: 200,
	})
)

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
