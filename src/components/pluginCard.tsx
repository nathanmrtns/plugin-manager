import styles from "@/styles/Plugins.module.css";
import Switch from "@/components/switch";
import { useGlobalContext } from "@/context/global";
import { useCallback } from "react";

export function PluginCard({
  tabId,
  pluginKey,
  isActive,
  isDisabled,
}: {
  tabId: string;
  pluginKey: string;
  isActive: boolean;
  isDisabled: boolean;
}) {
  const { state, dispatch } = useGlobalContext();
  const { plugins } = state;

  const toggleSwitch = useCallback(
    async (isActive: boolean) => {
      let url = `api/tabs/${tabId}/plugins/${pluginKey}/`;
      if (isActive) url = url + "deactivate";
      else {
        url = url + "activate";
      }
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
      dispatch({ type: "SET_UPDATED_DATA", payload: data });
    },
    [dispatch, pluginKey, tabId]
  );

  const handleChange = useCallback(() => {
    toggleSwitch(isActive);
  }, [toggleSwitch, isActive]);

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
