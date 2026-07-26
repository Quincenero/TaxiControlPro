const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); 
const { proteger } = require("../middlewares/auth"); 
const { User } = require("../models");

// Rutas públicas
router.post("/login", authController.login);
router.post("/register", authController.register);

// Rutas protegidas
router.get("/profile", proteger, async (req, res, next) => {
  try {
    const usuario = await User.findById(req.user.id).select("-password");
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.json({
      success: true,
      message: "Perfil del usuario",
      user: usuario
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
