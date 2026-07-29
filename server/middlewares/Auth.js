const jwt = require("jsonwebtoken");
const User = require("../models/User");

const proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No autorizado - Token no proporcionado",
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario en DB
    const usuario = await User.findById(decoded.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        message: "Usuario desactivado",
      });
    }

    req.user = usuario;
    next();
  } catch (error) {
       console.log(error.message);
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

const autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: `Rol ${req.user.rol} no autorizado para esta acción`,
      });
    }
    next();
  };
};

module.exports = { proteger, autorizar };
