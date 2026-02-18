import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";

import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.description}>
        Запрашиваемая страница не существует или была удалена.
      </p>
      <Button variant="primary" onClick={() => navigate(ROUTES.PRODUCTS)}>
        К списку товаров
      </Button>
    </div>
  );
}

export default NotFoundPage;
