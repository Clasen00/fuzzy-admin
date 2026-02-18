import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.css";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
