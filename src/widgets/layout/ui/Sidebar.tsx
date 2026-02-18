import { NavLink } from "react-router-dom";

import { ROUTES } from "@/shared/config";

import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { label: "Главная", to: ROUTES.HOME },
  { label: "Товары", to: ROUTES.PRODUCTS },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Admin Panel</div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
