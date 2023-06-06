import { useGlobalContext } from "@/context/global";
import { PluginCard } from "./pluginCard";
import styles from "@/styles/Plugins.module.css";

export default function PluginsList({
  title,
  tab,
  active,
  inactive,
  disabled,
}: any) {
  const enabledPlugins = [...active, ...inactive, ...disabled].sort();

  return (
    <div className={styles.plugins}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.pluginsList}>
        {enabledPlugins.map((pluginKey: any, idx: number) => {
          const isActive = active.indexOf(pluginKey) >= 0;
          const isDisabled = disabled.indexOf(pluginKey) >= 0;

          return (
            <PluginCard
              key={idx}
              tab={tab}
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
