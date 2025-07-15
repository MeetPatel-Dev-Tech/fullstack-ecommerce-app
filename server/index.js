import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 8080;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
