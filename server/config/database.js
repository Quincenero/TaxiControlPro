const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB conectado exitosamente");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

// Eventos útiles
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose conectado al servidor MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("⚠️ Error en la conexión de Mongoose:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("🔌 Mongoose desconectado de MongoDB");
});

module.exports = connectDB;
