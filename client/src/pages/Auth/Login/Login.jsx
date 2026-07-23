import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";

import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Logo from "@/components/ui/Logo/Logo";

import styles from "./Login.module.css";

function Login() {
  return (
    <AuthLayout>

      <Card
        header={<Logo />}
      >

        <div className={styles.form}>

          <Input
            label="Correo electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
          />

          <Button>
            Iniciar sesión
          </Button>

          <Link to="/register" className={styles.link}>
            Crear una cuenta
          </Link>

          <Link
            to="/forgot-password"
            className={styles.link}
          >
            ¿Olvidaste tu contraseña?
          </Link>

        </div>

      </Card>

    </AuthLayout>
  );
}

export default Login;