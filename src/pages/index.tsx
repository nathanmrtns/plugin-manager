import Head from "next/head";
import styles from "@/styles/Main.module.css";
import { useGlobalContext } from "@/context/global";
import PluginsList from "@/components/pluginList";

export default function Marketing() {
  const { state } = useGlobalContext();
  const { tabdata } = state;
  const marketingTabData = tabdata["tab1"];

  return (
    <>
      <Head>
        <title>Plugin Manager</title>
        <meta name="description" content="Plugin Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div>
          <PluginsList
            tab="tab1"
            title="Marketing Plugins"
            active={marketingTabData.active}
            inactive={marketingTabData.inactive}
            disabled={marketingTabData.disabled}
          />
        </div>
      </main>
    </>
  );
}
