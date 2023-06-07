import Head from "next/head";
import { useGlobalContext } from "@/context/global";
import PluginsList from "@/components/pluginList";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import styles from "@/styles/Main.module.css";

export default function PluginPageContainer({
  tab,
  title,
}: {
  tab: string;
  title: string;
}) {
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useGlobalContext();
  const { tabdata } = state;
  const tabData = tabdata[tab];

  const fetchTabs = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/tabs");
    const data = await response.json();
    dispatch({ type: "SET_PLUGINS", payload: data });
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!tabdata[tab]) {
      fetchTabs();
    } else {
      setLoading(false);
    }
  }, [fetchTabs, tab, tabdata]);

  return (
    <>
      <Head>
        <title>Plugin Manager</title>
        <meta name="description" content="Plugin Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <PluginsList
              tab={tab}
              title={title}
              active={tabData.active}
              inactive={tabData.inactive}
              disabled={tabData.disabled}
            />
          )}
        </div>
      </main>
    </>
  );
}
