import styles from "@/styles/Plugins.module.css";
import Switch from "@/components/switch";
import { useGlobalContext } from "@/context/global";
import { useCallback } from "react";

export function PluginCard({
  tab,
  pluginKey,
  isActive,
  isDisabled,
}: {
  tab: string;
  pluginKey: string;
  isActive: boolean;
  isDisabled: boolean;
}) {
  const { state, dispatch } = useGlobalContext();
  const { plugins } = state;

  const handleChange = useCallback(() => {
    dispatch({
      type: isActive ? "DEACTIVATE" : "ACTIVATE",
      payload: { tab: tab, plugin: pluginKey },
    });
  }, [dispatch, isActive, tab, pluginKey]);

  const plugin = plugins[pluginKey];

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
        <Switch checked={isActive} onClick={handleChange} />
      </div>
    </div>
  );
}
