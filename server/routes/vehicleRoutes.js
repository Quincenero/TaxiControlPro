const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const { proteger, autorizar } = require("../middlewares/auth");

// 📌 Rutas de vehículos

// Obtener todos los vehículos (Admin y Usuario)
router.get("/", proteger, autorizar("admin", "usuario"), vehicleController.obtenerVehiculos);

// Obtener un vehículo por ID (Admin y Usuario)
router.get("/:id", proteger, autorizar("admin", "usuario"), vehicleController.obtenerVehiculo);

// Crear vehículo (Admin y Usuario)
router.post("/", proteger, autorizar("admin", "usuario"), vehicleController.crearVehiculo);

// Actualizar vehículo por ID (Admin y Usuario)
router.put("/:id", proteger, autorizar("admin", "usuario"), vehicleController.actualizarVehiculo);

// Eliminar vehículo por ID (solo Admin)
router.delete("/:id", proteger, autorizar("admin"), vehicleController.eliminarVehiculo);

// Obtener documentos asociados a un vehículo (Admin, Usuario y Conductor)
router.get("/:id/documentos", proteger, autorizar("admin", "usuario", "conductor"), vehicleController.obtenerDocumentosVehiculo);

module.exports = router;
