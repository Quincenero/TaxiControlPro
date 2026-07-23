import styles from "./Card.module.css";

function Card({ children, header }) {
  return (
    <section className={styles.card}>
      {header && (
        <div className={styles.header}>
          {header}
        </div>
      )}

      {children}
    </section>
  );
}

export default Card;