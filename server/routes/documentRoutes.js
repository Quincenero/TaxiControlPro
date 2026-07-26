const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const { proteger, autorizar } = require("../middlewares/auth");

// 📌 Rutas de documentos

// Obtener todos los documentos (Admin, Usuario y Conductor)
router.get("/", proteger, autorizar("admin", "usuario", "conductor"), documentController.obtenerDocumentos);

// Obtener un documento por ID (Admin, Usuario y Conductor)
router.get("/:id", proteger, autorizar("admin", "usuario", "conductor"), documentController.obtenerDocumento);

// Crear documento (Admin, Usuario y Conductor)
router.post("/", proteger, autorizar("admin", "usuario", "conductor"), documentController.crearDocumento);

// Actualizar documento por ID (Admin, Usuario y Conductor)
router.put("/:id", proteger, autorizar("admin", "usuario", "conductor"), documentController.actualizarDocumento);

// Eliminar documento por ID (solo Admin)
router.delete("/:id", proteger, autorizar("admin"), documentController.eliminarDocumento);

module.exports = router;
