import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/Sidebar.module.css";
import DataGuardLogo from "@/components/icons/DataGuardLogo";
import MarketingIcon from "@/components/icons/Marketing";
import PersonnelIcon from "@/components/icons/Personnel";
import FinanceIcon from "@/components/icons/Finance";
import { useGlobalContext } from "@/context/global";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "./loader";
import Switch from "./switch";
import { ApiFetchTabs } from "@/actions/apiActions";

function SidebarItem({
  title,
  icon,
  className,
  goTo,
  onClick,
}: {
  title: string;
  className?: string;
  icon: JSX.Element;
  goTo: string;
  onClick: () => void;
}) {
  return (
    <li onClick={onClick}>
      <Link href={goTo} className={`${styles.sidebarItem} ${className}`}>
        {icon}
        <span>{title}</span>
      </Link>
    </li>
  );
}

function SidebarItemList({
  handleTabChange,
}: {
  handleTabChange: (tabId: string) => void;
}) {
  const pathname = usePathname();
  const { state } = useGlobalContext();
  const { tabs, tabdata } = state;

  const sidebarIcons: { [key: string]: JSX.Element } = {
    "icon-marketing": <MarketingIcon />,
    "icon-people": <PersonnelIcon />,
    "icon-finance": <FinanceIcon />,
  };

  const sidebarPaths: { [key: string]: string } = {
    Marketing: "/",
    Finance: "/finance",
    Personnel: "/personnel",
  };

  return (
    <div className={styles.sidebarList}>
      <ul>
        {tabs.map((tab: string, idx: number) => {
          const tabPath = sidebarPaths[tabdata[tab].title];
          return (
            <SidebarItem
              key={idx}
              title={tabdata[tab].title}
              icon={sidebarIcons[tabdata[tab].icon]}
              className={pathname === tabPath ? `${styles.itemActive}` : ""}
              goTo={tabPath}
              onClick={() => handleTabChange(tab)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default function Sidebar() {
  const { state, dispatch } = useGlobalContext();
  const { tabs, tabdata } = state;
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const pathToTab: { [key: string]: string } = {
    "/": "tab1",
    "/finance": "tab2",
    "/personnel": "tab3",
  };

  const [activeTab, setActiveTab] = useState(pathToTab[pathname] ?? "");

  const fetchTabs = useCallback(async () => {
    setLoading(true);
    const data = await ApiFetchTabs();
    dispatch({ type: "SET_TABS", payload: data });
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  const isAllPluginsDisabled = tabdata[activeTab]?.allDisabled ?? false;
  const handleTabChange = async (tab: string) => {
    setActiveTab(tab);
  };

  const fetchDisablePlugins = useCallback(async () => {
    const response = await fetch(
      `/api/tabs/${activeTab}/plugins/set_all_state`,
      {
        method: "POST",
        body: JSON.stringify({ state: !isAllPluginsDisabled }),
      }
    );
    const data = await response.json();
    dispatch({ type: "SET_UPDATED_DATA", payload: data });
  }, [activeTab, dispatch, isAllPluginsDisabled]);

  return (
    <div
      className={`${styles.sidebar} ${
        isAllPluginsDisabled ? styles.pluginsDisabled : styles.pluginsEnabled
      }`}
    >
      <div className={styles.sidebarLogo}>
        <DataGuardLogo />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <SidebarItemList handleTabChange={handleTabChange} />
      )}
      <div className={styles.allPluginsToggle}>
        <span>All plugins {isAllPluginsDisabled ? "disabled" : "enabled"}</span>
        <Switch
          showStatus={false}
          onClick={fetchDisablePlugins}
          checked={!isAllPluginsDisabled}
        />
      </div>
    </div>
  );
}
