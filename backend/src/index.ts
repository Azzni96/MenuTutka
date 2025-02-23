import express from "express";
import userRoutes from "./routes/userRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import menuRoutes from "./routes/menuRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import menuLikeRoutes from "./routes/menuLikesRoutes";

import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/menuLikes", menuLikeRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
