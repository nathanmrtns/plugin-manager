import styles from "@/styles/Main.module.css";
import { useGlobalContext } from "@/context/global";
import PluginsList from "@/components/pluginList";

export default function Finance() {
  const { state } = useGlobalContext();
  const { tabdata } = state;
  const marketingTabData = tabdata["tab2"];

  return (
    <main className={styles.main}>
      <div>
        <PluginsList
          title="Finance Plugins"
          active={marketingTabData.active}
          inactive={marketingTabData.inactive}
          disabled={marketingTabData.disabled}
        />
      </div>
    </main>
  );
}
