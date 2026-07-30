const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { proteger, autorizar } = require("../middlewares/auth");

// Profile
router.get("/profile", proteger, userController.getProfile);

router.put("/profile", proteger, userController.updateProfile);

// Obtener todos los usuarios (solo Admin)
//router.get("/", proteger, autorizar("admin"), userController.obtenerUsuarios);

// Obtener un usuario por ID (Admin o el mismo usuario)
//router.get("/:id", proteger, autorizar("admin", "usuario"), userController.obtenerUsuario);

// Crear usuario (solo Admin)
//router.post("/", proteger, autorizar("admin"), userController.crearUsuario);

// Actualizar usuario por ID (Admin o el mismo usuario)
//router.put("/:id", proteger, autorizar("admin", "usuario"), userController.actualizarUsuario);

// Eliminar usuario por ID (solo Admin)
//router.delete("/:id", proteger, autorizar("admin"), userController.eliminarUsuario);

module.exports = router;
