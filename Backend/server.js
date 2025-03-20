import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import registrationRoutes from "./Routes/Registeration/registeration.js";
import ProfessionalInfo from "./Routes/Professional_Info/info.js";
import CreateGig from "./Routes/Gig_Operations/create_gig.js";
import GetGig from "./Routes/Gig_Operations/get_gigs.js";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDbString = process.env.ConnectionString;

app.use(express.json());
app.use(cors());
mongoose.connect(mongoDbString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/auth", registrationRoutes);
app.use("/api/auth" , ProfessionalInfo);
app.use("/api/auth" , CreateGig);
app.use("/api/auth" , GetGig);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
