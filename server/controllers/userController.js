const { User } = require('../models');

// Crear usuario (Admin)
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, password, rol } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: "El usuario ya existe"
      });
    }

    const usuario = await User.create({ nombre, apellido, telefono, email, password, rol });

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar usuario por ID
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    res.json({
      success: true,
      message: "Usuario actualizado",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Eliminar usuario por ID
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    res.json({
      success: true,
      message: "Usuario eliminado"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
