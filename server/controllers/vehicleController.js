const { Vehicle, Document } = require('../models');

// Obtener todos los vehículos
exports.obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehicle.find({
      usuario: req.user._id
    })
      .populate('usuario', 'nombre apellido email')
      .populate('documentos', 'tipo numero estado fechaVencimiento');

    res.json({
      success: true,
      count: vehiculos.length,
      data: vehiculos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener un vehículo por ID
exports.obtenerVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehicle.findById(req.params.id)
    .populate('usuario', 'nombre apellido email')
    .populate('documentos', 'tipo numero estado fechaVencimiento');

  if (!vehiculo) {
    return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
  }

  if (!vehiculo.usuario.equals(req.user._id)) {
    return res.status(403).json({ success: false, message: "No tienes permiso para ver este vehículo" });
  }

    res.json({ success: true, data: vehiculo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Crear vehículo
exports.crearVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehicle.create({
      ...req.body,
      usuario: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Vehículo creado exitosamente",
      data: vehiculo
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar vehículo por ID
exports.actualizarVehiculo = async (req, res) => {
  try {
   const vehiculo = await Vehicle.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
    }
    if (!vehiculo.usuario.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: "No tienes permiso para actualizar este vehículo" });
    }

    const updatedVehiculo = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: "Vehículo actualizado con éxito",
      data: recurso
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Eliminar vehículo por ID
exports.eliminarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehicle.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
    }
    if (!vehiculo.usuario.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: "No tienes permiso para eliminar este vehículo" });
    }

    await vehiculo.deleteOne();
    res.json({ success: true, message: "Vehículo eliminado" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener documentos asociados a un vehículo
exports.obtenerDocumentosVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehicle.findById(req.params.id);
      if (!vehiculo) {
        return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
      }
      if (!vehiculo.usuario.equals(req.user._id)) {
        return res.status(403).json({ success: false, message: "No tienes permiso para ver documentos de este vehículo" });
      }


    const documentos = await Document.find({ vehiculo: req.params.id })
      .populate('usuario', 'nombre apellido email');

    res.json({
      success: true,
      count: documentos.length,
      data: documentos
    });

  } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      res.status(500).json({ success: false, message: error.message });
    }

};

// Obtener mi vehículo
exports.obtenerMiVehiculo = async (req, res) => {
  try {
    const vehiculos = await Vehicle.find({ usuario: req.user._id })
      .populate('usuario', 'nombre apellido email')
      .populate('documentos', 'tipo numero estado fechaVencimiento');

    res.json({
      success: true,
      count: vehiculos.length,
      data: vehiculos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

