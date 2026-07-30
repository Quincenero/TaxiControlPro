const User = require("../models/User");

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar perfil
exports.updateProfile = async (req, res, next) => {
  try {
    const camposPermitidos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      username: req.body.username,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      documento: req.body.documento,
      fechaNacimiento: req.body.fechaNacimiento,
      licencia: req.body.licencia,
      avatar: req.body.avatar,
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      camposPermitidos,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Perfil actualizado correctamente",
      user,
    });
  } catch (error) {
    next(error);
  }
};