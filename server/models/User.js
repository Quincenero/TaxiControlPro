const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true,
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [50, "El nombre no debe exceder 50 caracteres"]
  },
  apellido: { 
    type: String, 
    required: [true, "El apellido es obligatorio"],
    trim: true,
    minlength: [2, "El apellido debe tener al menos 2 caracteres"],
    maxlength: [50, "El apellido no debe exceder 50 caracteres"] 
  },
  email: { 
    type: String, 
    required: [true, "El email es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Ingresa un email válido'] 
  },
  telefono: { 
    type: String, 
    required: [true, "El teléfono es obligatorio"],
    match: [/^\d{10,15}$/, "Ingresa un número de teléfono válido"]
  },
  password: { 
    type: String, 
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    select: false
  },
  direccion:{
    calle: { type:String, required:true},
    numero: { type:String, required:true},
    ciudad: {type:String, required:true},
    provincia: {type:String, required:true},
    codigoPostal: {type:String, required:true}
  },
  tipoDocumento: {
    type: String,
    enum: ['DNI', 'Pasaporte', 'Cédula', 'Otro'],
    default: 'DNI'
  },
  numeroDocumento: {
    type: String,
    required: true,
    unique: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  rol: {
    type: String,
    enum: ["admin", "usuario", "conductor"],
    default: "usuario"
  },
  activo: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: { 
    type: String 
  },
  resetPasswordExpire: { 
    type: Date 
  },

  ultimoAcceso: {
    type: Date,
    default: Date.now
  }
  
  }, { 
  timestamps: true 
});

// Hash password antes de guardar
userSchema.pre('save', async function(){
  if (!this.isModified('password')) return ;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparar contraseñas
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Obtener datos públicos sin password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

// Generar token de resteo en el modo user
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutos

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
