const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
      direccion,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      rol
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email y contraseña son requeridos" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "El usuario ya existe" });
    }

    const user = await User.create({
      nombre,
      apellido,
      telefono,
      email,
      password,
      direccion,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      rol
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente 🚖",
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login exitoso 🚖",
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};
