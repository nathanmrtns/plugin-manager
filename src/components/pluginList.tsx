import { PluginCard } from "./pluginCard";
import styles from "@/styles/Plugins.module.css";

export default function PluginsList({ title, tabId, tabData }: any) {
  const { active, inactive, disabled, allDisabled } = tabData;
  const enabledPlugins = [...active, ...inactive, ...disabled].sort();

  return (
    <div className={styles.plugins}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.pluginsList}>
        {enabledPlugins.map((pluginKey: any, idx: number) => {
          const isActive = active.indexOf(pluginKey) >= 0;
          const isDisabled = disabled.indexOf(pluginKey) >= 0 || allDisabled;

          return (
            <PluginCard
              key={idx}
              tabId={tabId}
              pluginKey={pluginKey}
              isActive={isActive}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
}
