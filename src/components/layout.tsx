import { Inter } from "next/font/google";
import styles from "@/styles/Layout.module.css";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: any }) {
  return (
    <main className={`${styles.layoutWrapper} ${inter.className}`}>
      <div className={`${styles.sidebar}`}>
        <Sidebar />
      </div>
      <div className={`${styles.page}`}>{children}</div>
    </main>
  );
}
