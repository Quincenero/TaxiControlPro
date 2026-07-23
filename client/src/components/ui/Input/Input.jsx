import styles from "./Input.module.css";

function Input({
  label,
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;