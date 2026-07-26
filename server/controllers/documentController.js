const { Document } = require('../models');

// Obtener todos los documentos
exports.obtenerDocumentos = async (req, res) => {
  try {
    const documentos = await Document.find()
      .populate('usuario', 'nombre apellido email')
      .populate('vehiculo', 'marca modelo patente');

    res.json({
      success: true,
      count: documentos.length,
      data: documentos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener un documento por ID
exports.obtenerDocumento = async (req, res) => {
  try {
    const documento = await Document.findById(req.params.id)
      .populate('usuario', 'nombre apellido email')
      .populate('vehiculo', 'marca modelo patente');

    if (!documento) {
      return res.status(404).json({ success: false, message: "Documento no encontrado" });
    }

    res.json({ success: true, data: documento });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Crear documento
exports.crearDocumento = async (req, res) => {
  try {
    const documento = await Document.create(req.body);

    res.status(201).json({
      success: true,
      message: "Documento creado exitosamente",
      data: documento
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar documento por ID
exports.actualizarDocumento = async (req, res) => {
  try {
    const documento = await Document.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!documento) {
      return res.status(404).json({ success: false, message: "Documento no encontrado" });
    }

    res.json({
      success: true,
      message: "Documento actualizado",
      data: documento
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Eliminar documento por ID
exports.eliminarDocumento = async (req, res) => {
  try {
    const documento = await Document.findByIdAndDelete(req.params.id);

    if (!documento) {
      return res.status(404).json({ success: false, message: "Documento no encontrado" });
    }

    res.json({ success: true, message: "Documento eliminado" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
