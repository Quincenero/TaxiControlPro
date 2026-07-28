const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  password: { type: String, required: true, select: false },
  direccion: {
    calle: { type: String, required: true },
    numero: { type: String, required: true },
    ciudad: { type: String, required: true },
    provincia: { type: String, required: true },
    codigoPostal: { type: String, required: true }
  },
  tipoDocumento: { type: String, default: "DNI" },
  numeroDocumento: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  rol: { type: String, enum: ["admin", "usuario", "conductor"], default: "usuario" },
  activo: { type: Boolean, default: true },
  ultimoAcceso: { type: Date, default: Date.now },

  // Campos para reset password
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date }
}, { timestamps: true });

// Hash password antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generar token de reseteo
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutos
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
