const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Registro de usuarios
exports.register = async (req, res, next) => {
  try {
    const {
      nombre,
      apellido,
      username,
      telefono,
      email,
      password,
      direccion,
      documento,
      fechaNacimiento,
      rol
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email y contraseña son requeridos" });
    }

    const existingUser = await User.findOne({ 
      $or: [
        { email },
        {username }
      ] 
      
    });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "El usuario ya existe" });
    }

    const user = await User.create({
      nombre,
      apellido,
      username,
      telefono,
      email,
      password,
      direccion,
      documento,
      fechaNacimiento,
      rol
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente 🚖",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

// Obtener usuario autenticado
exports.me = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (err) {
    next(err);
  }
};

// Login de usuarios
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Contraseña incorrecta" 
      });
     }
     // Actualiza ultimo acceso
    user.ultimoAcceso = new Date();
    await user.save();
   

    const token = jwt.sign(
      { id: user._id, 
        email: user.email, 
        rol: user.rol,
        username:user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: "Login exitoso 🚖",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false }); // guardar token sin validar todo

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/resetPassword/${resetToken}`;
    const message = `Haz click en el siguiente link para resetear tu contraseña: ${resetUrl}`;

    await sendEmail({
      to: user.email,
      subject: "Recuperación de contraseña",
      text: message,
    });

    res.status(200).json({ success: true, message: "Email enviado" });
  } catch (err) {
    next(err);
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Token inválido o expirado" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save(); // guardar solo contraseña

    res.json({ success: true, message: "Contraseña actualizada correctamente" });
  } catch (err) {
    next(err);
  }
};
