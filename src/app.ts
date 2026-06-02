import express from "express";
import productRoutes from "./api/v1/routes/productRoutes";

const app = express();

app.use(express.json());
app.use("/api/v1", productRoutes);

export default app;
