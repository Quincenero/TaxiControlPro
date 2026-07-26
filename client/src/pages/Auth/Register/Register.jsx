import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Card from "@/components/ui/Card/Card";
import Logo from "@/components/ui/Logo/Logo";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresá un email válido";
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Repetí la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login"); // redirige al login después de registrarse
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <AuthLayout>
      <Card header={<Logo />}>
        <h2>Crear cuenta</h2>
        <p>Registrate para comenzar a usar Taxi Control Pro.</p>

        <form onSubmit={handleSubmit} noValidate>
          <Input id="nombre" label="Nombre" name="nombre" type="text"
            value={formData.nombre} onChange={handleChange}
            placeholder="Ingresá tu nombre" error={errors.nombre} />

          <Input id="apellido" label="Apellido" name="apellido" type="text"
            value={formData.apellido} onChange={handleChange}
            placeholder="Ingresá tu apellido" error={errors.apellido} />

          <Input id="email" label="Email" name="email" type="email"
            value={formData.email} onChange={handleChange}
            placeholder="Ingresá tu email" error={errors.email} />

          <Input id="telefono" label="Teléfono" name="telefono" type="tel"
            value={formData.telefono} onChange={handleChange}
            placeholder="Ingresá tu teléfono" error={errors.telefono} />

          <Input id="password" label="Contraseña" name="password" type="password"
            value={formData.password} onChange={handleChange}
            placeholder="Ingresá una contraseña" error={errors.password} />

          <Input id="confirmPassword" label="Repetir contraseña" name="confirmPassword" type="password"
            value={formData.confirmPassword} onChange={handleChange}
            placeholder="Repetí tu contraseña" error={errors.confirmPassword} />

          <Button type="submit">Crear cuenta</Button>
        </form>

        <p>
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login">Iniciar sesión</Link>
        </p>
      </Card>
    </AuthLayout>
  );
}

export default Register;
