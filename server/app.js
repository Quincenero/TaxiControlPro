const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
const authRouter = require("./routes/authRoutes");
app.use("/api/auth", authRouter);

// Endpoint raíz
app.get("/", (req, res) => {
  res.json({ message: "Taxi Control Pro API funcionando 🚕" });
});

// Middleware de errores
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
