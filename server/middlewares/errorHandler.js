
const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err);

  // Errores de validación de Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors
    });
  }

  // Error de duplicado (unique index)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `El valor para '${field}' ya existe`
    });
  }

  // Otros errores
  res.status(500).json({
    success: false,
    message: err.message || "Error interno del servidor"
  });
};

module.exports = errorHandler;
