import { useGlobalContext } from "@/context/global";
import { PluginCard } from "./pluginCard";
import styles from "@/styles/Plugins.module.css";

export default function PluginsList({
  title,
  active,
  inactive,
  disabled,
}: any) {
  const { state } = useGlobalContext();
  const { plugins } = state;
  const enabledPlugins = [...active, ...inactive, ...disabled].sort();

  return (
    <div className={styles.plugins}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.pluginsList}>
        {enabledPlugins.map((pluginKey: any, idx: number) => {
          const isActive = active.indexOf(pluginKey);
          const isDisabled = disabled.indexOf(pluginKey);

          return (
            <PluginCard
              key={idx}
              plugin={plugins[pluginKey]}
              isActive={isActive}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
}
