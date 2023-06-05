import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/Sidebar.module.css";
import DataGuardLogo from "@/components/icons/DataGuardLogo";
import MarketingIcon from "@/components/icons/Marketing";
import PersonnelIcon from "@/components/icons/Personnel";
import FinanceIcon from "@/components/icons/Finance";

function SidebarItem({
  title,
  icon,
  className,
  goTo,
}: {
  title: string;
  className?: string;
  icon: any;
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

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarIcons = {
    marketing: <MarketingIcon />,
    personnel: <PersonnelIcon />,
    finance: <FinanceIcon />,
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <DataGuardLogo />
      </div>
      <ul>
        <SidebarItem
          title="Marketing"
          className={pathname === "/" ? `${styles.itemActive}` : ""}
          icon={sidebarIcons["marketing"]}
          goTo="/"
        />
        <SidebarItem
          title="Finance"
          className={pathname === "/finance" ? `${styles.itemActive}` : ""}
          icon={sidebarIcons["finance"]}
          goTo="/finance"
        />
        <SidebarItem
          title="Personnel"
          className={pathname === "/personnel" ? `${styles.itemActive}` : ""}
          icon={sidebarIcons["personnel"]}
          goTo="/personnel"
        />
      </ul>
    </div>
  );
}
