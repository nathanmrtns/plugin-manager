import styles from "@/styles/Switch.module.css";

export default function Switch({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <label className={styles.toggle}>
      <input
        className={styles.toggleCheckbox}
        type="checkbox"
        checked={checked}
        onClick={onClick}
        readOnly
      />
      <div className={styles.toggleSwitch}></div>
      <span
        className={`${styles.toggleLabel} ${
          checked ? styles.toggleLabelChecked : styles.toggleLabelBlocked
        }`}
      >
        {checked ? "Allowed" : "Blocked"}
      </span>
    </label>
  );
}
