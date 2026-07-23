import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

import Card from "@/components/ui/Card/Card";
import Logo from "@/components/ui/Logo/Logo";

function ForgotPassword() {
  return (
    <AuthLayout>

      <Card
        header={<Logo />}
      >
        <h2>
          Recuperar contraseña
        </h2>

      </Card>

    </AuthLayout>
  );
}

export default ForgotPassword;