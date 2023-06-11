import Head from "next/head";
import { useGlobalContext } from "@/context/global";
import PluginsList from "@/components/pluginList";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import styles from "@/styles/Main.module.css";
import { ApiFetchTabs } from "@/actions/apiActions";

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
    const data = await ApiFetchTabs();
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
            <PluginsList tabId={tab} title={title} tabData={tabData} />
          )}
        </div>
      </main>
    </>
  );
}
