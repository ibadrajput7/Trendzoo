import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Shopping API is running",
    });
});

// Database connection
await connectDB();

// Local development server
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export Express app for Vercel
export default app;