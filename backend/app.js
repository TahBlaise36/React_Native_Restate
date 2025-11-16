import express from "express";
import { PORT } from "./config/env.js";
import { authorize } from "./middlewares/auth.middleware.js";
import { isAdmin } from "./middlewares/isAdmin.middleware.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDatabase from "./database/mongodb.js";
import bookingRouter from "./routes/booking.routes.js";
import favouriteRouter from "./routes/favourite.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
import facilityRouter from "./routes/facilitty.routes.js";
import reviewRouter from "./routes/review.routes.js";
import propertyRouter from "./routes/property.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
connectToDatabase();

// Define routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authorize, isAdmin, userRouter);
app.use("/api/v1/bookings", authorize, bookingRouter);
app.use("/api/v1/properties", authorize, propertyRouter);
app.use("/api/v1/facilities", authorize, facilityRouter);
app.use("/api/v1/reviews", authorize, reviewRouter);
app.use("/api/v1/favorites", authorize, favouriteRouter);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
