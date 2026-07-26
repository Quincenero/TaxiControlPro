const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El vehículo debe pertenecer a un usuario"]
  },
  marca: {
    type: String,
    required: [true, "La marca es obligatoria"],
    trim: true,
    uppercase: true
  },
  modelo: {
    type: String,
    required: [true, "El modelo es obligatorio"],
    trim: true
  },
  año: {
    type: Number,
    required: [true, "El año es obligatorio"],
    min: [1900, "El año debe ser mayor a 1900"],
    max: [new Date().getFullYear(), "El año no puede ser mayor al actual"]
  },
  patente: {
    type: String,
    required: [true, "La patente es obligatoria"],
    unique: true,
    trim: true,
    uppercase: true,
    match: [/^[A-Z0-9]{6,7}$/, "Formato de patente inválido"]
  },
  combustible: {
    type: String,
    enum: ["nafta", "diesel", "electrico", "hibrido", "gnc"],
    default: "gnc"
  },
  kilometraje: {
    type: Number,
    default: 0,
    min: 0
  },
  estado: {
    type: String,
    enum: ["activo", "inactivo", "en_revision", "bloqueado"],
    default: "activo"
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  ultimaRevision: {
    type: Date
  },
  documentos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document"
  }]
}, {
  timestamps: true
});

vehicleSchema.methods.toJSON = function() {
  const vehicle = this.toObject();
  delete vehicle.__v;
  return vehicle;
};


vehicleSchema.index({ usuario: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
