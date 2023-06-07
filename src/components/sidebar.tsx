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

function SidebarItem({
  title,
  icon,
  className,
  goTo,
}: {
  title: string;
  className?: string;
  icon: JSX.Element;
  goTo: string;
}) {
  return (
    <li>
      <Link href={goTo} className={`${styles.sidebarItem} ${className}`}>
        {icon}
        <span>{title}</span>
      </Link>
    </li>
  );
}

function SidebarItemList() {
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
    <ul>
      {tabs.map((tab: any, idx: number) => {
        const tabPath = sidebarPaths[tabdata[tab].title];
        return (
          <SidebarItem
            key={idx}
            title={tabdata[tab].title}
            icon={sidebarIcons[tabdata[tab].icon]}
            className={pathname === tabPath ? `${styles.itemActive}` : ""}
            goTo={tabPath}
          />
        );
      })}
    </ul>
  );
}

export default function Sidebar() {
  const { dispatch } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  const fetchTabs = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/tabs");
    const data = await response.json();
    dispatch({ type: "SET_TABS", payload: data });
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <DataGuardLogo />
      </div>
      {loading ? <Loader /> : <SidebarItemList />}
    </div>
  );
}
