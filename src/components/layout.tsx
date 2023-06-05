import styles from '@/styles/Layout.module.css'
import Sidebar from '@/components/sidebar';

export default function Layout({ children } : { children : any}) {
  return (
    <main className={`${styles.layoutWrapper}`}>
      <div className={`${styles.sidebar}`}>
        <Sidebar />
      </div>
      <div className={`${styles.page}`}>
        {children}
      </div>
    </main>
  );
}