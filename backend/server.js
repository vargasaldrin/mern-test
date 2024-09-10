import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./products/products.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started on http://localhost:${PORT}`);
});
