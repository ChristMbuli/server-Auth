import express from "express";
import dotenv from "dotenv";
import connectionDB from "./config/db.js";
import employeeRoutes from "./views/employe.views.js";
import authRoutes from "./views/users.views.js";
import cookieParser from "cookie-parser";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

connectionDB;

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 9000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
