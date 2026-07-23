import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

import Card from "@/components/ui/Card/Card";
import Logo from "@/components/ui/Logo/Logo";

function Register() {
  return (
    <AuthLayout>

      <Card
        header={<Logo />}
      >
        <h2>
          Crear cuenta
        </h2>

      </Card>

    </AuthLayout>
  );
}

export default Register;