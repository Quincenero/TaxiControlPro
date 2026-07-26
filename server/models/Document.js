const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El documento debe pertenecer a un usuario"]
  },
  vehiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: false
  },
  tipo: {
    type: String,
    enum: [
      "licencia de conducir",
      "seguro",
      "tarjeta verde",
      "licencia de taxi",
      "vtv",
      "patente",
      "monotributo",
      "otro"
    ],
    required: [true, "El tipo de documento es obligatorio"],
    default: "licencia de conducir"
  },
  numero: {
    type: String,
    required: [true, "El número de documento es obligatorio"],
    unique: true,
    trim: true
  },
  fechaEmision: {
    type: Date,
    required: [true, "La fecha de emisión es obligatoria"]
  },
  fechaVencimiento: {
    type: Date,
    required: [true, "La fecha de vencimiento es obligatoria"]
  },
  fechaNotificacion: {
    type: Date
  },
  archivoUrl: {
    type: String,
    match: [/^https?:\/\/.+/, "Debe ser una URL válida"],
    required: false
  },
  estado: {
    type: String,
    enum: ["vigente", "vencido", "pendiente"],
    default: "vigente"
  },
  observaciones: {
    type: String,
    trim: true
  },
  renovacionAutomatica: {
    type: Boolean,
    default: false
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  actualizadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

// Método para ocultar __v
documentSchema.methods.toJSON = function() {
  const doc = this.toObject();
  delete doc.__v;
  return doc;
};

// Índices útiles

documentSchema.index({ usuario: 1 });
documentSchema.index({ vehiculo: 1 });

module.exports = mongoose.model("Document", documentSchema);
