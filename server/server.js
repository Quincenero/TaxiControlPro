require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `🚕 Taxi Control Pro API corriendo en puerto ${PORT} [${process.env.NODE_ENV || "development"}]`
      );
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
    process.exit(1);
  }
};

// Middleware de errores
app.use((err, req, res, next) => {
  console.error("Error capturado:", err.stack);
  res.status(500).json({ success: false, message: err.message });
});

startServer();
