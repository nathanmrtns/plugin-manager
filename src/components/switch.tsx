import styles from "@/styles/Switch.module.css";

export default function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={styles.toggle}>
      <input
        className={styles.toggleCheckbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
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
