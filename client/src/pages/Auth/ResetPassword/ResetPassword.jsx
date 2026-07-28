import { useState } from "react";
import { useParams } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Card from "@/components/ui/Card/Card";
import Logo from "@/components/ui/Logo/Logo";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";

function ResetPassword() {
  const { token } = useParams(); // token desde la URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/resetPassword/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Contraseña actualizada correctamente. Ya puedes iniciar sesión.");
      } else {
        setError(data.error || "No se pudo resetear la contraseña");
      }
    } catch (err) {
       setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card header={<Logo />}>
        <h2>Restablecer contraseña</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <Input
            label="Nueva contraseña"
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Repite tu nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </Button>
        </form>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </Card>
    </AuthLayout>
  );
}

export default ResetPassword;
