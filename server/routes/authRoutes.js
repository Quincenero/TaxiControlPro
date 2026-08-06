const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); 
const { proteger } = require("../middlewares/auth"); 
const { User } = require("../models");
const mongoose = require("mongoose");


// Rutas públicas
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forgotPassword", authController.forgotPassword);
router.put("/resetPassword/:token", authController.resetPassword);
router.get("/me", proteger, authController.me);

// Rutas protegidas
router.get("/profile", proteger, async (req, res, next) => {
  try {
    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const usuario = await User.findById(req.user._id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({
      success: true,
      message: "Perfil del usuario",
      data: usuario
    });
  } catch (error) {
    next(error);
  }
});


// Ruta de prueba de errores
router.get("/test-error", (req, res, next) => {
  const error = new Error("Este es un error de prueba");
  error.statusCode = 418;
  next(error);
});

module.exports = router;
