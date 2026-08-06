const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware para proteger rutas (requiere token válido)
const proteger = async (req, res, next) => {
  let token;

  // Buscar token en encabezado Authorization
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

    // Guardar usuario en req.user para usar en controladores
    req.user = usuario;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expirado" });
    }
    return res.status(401).json({ success: false, message: "Token inválido" });
  }
};

// Middleware para autorizar según roles
const autorizar = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado. Rol requerido: ${rolesPermitidos.join(", ")}`,
      });
    }
    next();
  };
};

module.exports = { proteger, autorizar };
