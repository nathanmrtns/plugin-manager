import styles from "@/styles/Switch.module.css";

export default function Switch({
  checked,
  onClick,
  showStatus = true,
}: {
  checked: boolean;
  onClick: () => void;
  showStatus: boolean;
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
      {showStatus && (
        <span
          className={`${styles.toggleLabel} ${
            checked ? styles.toggleLabelChecked : styles.toggleLabelBlocked
          }`}
        >
          {checked ? "Allowed" : "Blocked"}
        </span>
      )}
    </label>
  );
}
