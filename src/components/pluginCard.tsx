import styles from "@/styles/Plugins.module.css";
import Switch from "@/components/switch";

export function PluginCard({
  plugin,
  isActive,
  isDisabled,
}: {
  plugin: any;
  isActive: boolean;
  isDisabled: boolean;
}) {
  return (
    <div
      className={`${styles.pluginCard}  ${
        isDisabled ? styles.pluginCardDisabled : ""
      }`}
    >
      <div className={styles.infoWrapper}>
        <h3 className={styles.pluginCardTitle}>{plugin.title}</h3>
        <span className={styles.pluginCardDescription}>
          {plugin.description}
        </span>
      </div>
      <div>
        <Switch
          checked={isActive}
          onChange={() => console.log("Implement change")}
        />
      </div>
    </div>
  );
}
