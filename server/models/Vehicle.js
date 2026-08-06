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
  anio: {
    type: Number,
    required: [true, "El año es obligatorio"],
    min: [2000, "El año debe ser mayor a 2000"],
    validate: {
      validator: (value) => value <= new Date().getFullYear() + 1,
      message: "El año no puede ser mayor al actual"
    }
  },

  color: {
    type: String,
    required: [true, "El color es obligatorio"],
    trim: true
  },
  patente: {
    type: String,
    required: [true, "La patente es obligatoria"],
    unique: true,
    trim: true,
    uppercase: true,
    match: [/^[A-Z]{2}\d{3}[A-Z]{2}$/, "Formato de patente inválido"]
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
    enum: ["activo", "inactivo", "en_revision", "fuera_de_servicio"],
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
  const { __v, _id, ...vehicle } = this.toObject();
  vehicle.id = _id;
  return vehicle;
};

vehicleSchema.pre('save', function(next) {
  if (this.isModified('estado') && this.estado === 'en_revision') {
    this.ultimaRevision = new Date();
  }
  next();
});

vehicleSchema.index({ usuario: 1, patente:1 }, { unique: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
