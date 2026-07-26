import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Logo from "@/components/ui/Logo/Logo";

import styles from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresá un email válido";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso 🚖");
        // Guardar token si tu backend lo devuelve
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // redirige al panel principal
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  return (
    <AuthLayout>
      <Card header={<Logo />}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit} noValidate>
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Button type="submit">Iniciar sesión</Button>
          </form>

          <Link to="/register" className={styles.link}>
            Crear una cuenta
          </Link>

          <Link to="/forgot-password" className={styles.link}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default Login;
