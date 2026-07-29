// validators.js

// Validar email
const validarEmail = (email) => {
  if (!email) return false;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return regex.test(email);
};

// Validar teléfono (10 a 15 dígitos)
const validarTelefono = (telefono) => {
  if (!telefono) return false;

  const telefonoLimpio = telefono.replace(/\D/g,"");

  const regex = /^\d{10,15}$/;
  return regex.test(telefonoLimpio);
};

// Validar patente (6 o 7 caracteres alfanuméricos en mayúsculas)
const validarPatente = (patente) => {
  if (!patente) return false;

  patente = patente.toUpperCase();
  
  const regex = /^[A-Z0-9]{6,7}$/;
  return regex.test(patente);
};

// Validar contraseña (mínimo 6 caracteres, al menos una letra y un número)
const validarPassword = (password) => {
  const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/;

  return regex.test(password);
};

// Validar fecha (que sea Date válido y no futuro si aplica)
const validarFecha = (fecha) => {
  const date = new Date(fecha);
  return !isNaN(date.getTime());
};

module.exports = {
  validarEmail,
  validarTelefono,
  validarPatente,
  validarPassword,
  validarFecha
};
