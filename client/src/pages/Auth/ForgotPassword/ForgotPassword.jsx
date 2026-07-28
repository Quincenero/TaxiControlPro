import { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Card from "@/components/ui/Card/Card";
import Logo from "@/components/ui/Logo/Logo";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("📩 Revisa tu correo para el link de recuperación.");
      } else {
        setError(data.error || "No se pudo enviar el email");
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
        <h2>Recuperar contraseña</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="tuemail@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Enviando..." : "Enviar link de recuperación"}
          </Button>
        </form>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </Card>
    </AuthLayout>
  );
}

export default ForgotPassword;
