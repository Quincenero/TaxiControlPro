const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error capturado:", err);

  // Código HTTP por defecto
  let statusCode = err.statusCode || 500;

  // Mensaje por defecto
  let message =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Error interno del servidor";

  // ==========================
  // Error de validación de Mongoose
  // ==========================
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // ==========================
  // Error de índice único
  // ==========================
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(400).json({
      success: false,
      message: `El valor '${err.keyValue[field]}' ya existe para el campo '${field}'.`,
    });
  }

  // ==========================
  // ObjectId inválido
  // ==========================
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "ID inválido.",
    });
  }

  // ==========================
  // JWT inválido
  // ==========================
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Token inválido.",
    });
  }

  // ==========================
  // JWT expirado
  // ==========================
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "La sesión ha expirado. Inicie sesión nuevamente.",
    });
  }

  // ==========================
  // Respuesta general
  // ==========================
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;