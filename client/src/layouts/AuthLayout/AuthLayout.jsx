import styles from "./AuthLayout.module.css";

function AuthLayout({ children }) {
  return (
    <main className={styles.container}>
      {children}
    </main>
  );
}

export default AuthLayout;