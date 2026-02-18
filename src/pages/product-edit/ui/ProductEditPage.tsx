import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "@/shared/assets/icons";
import { Button, Icon } from "@/shared/ui";

import styles from "./ProductEditPage.module.css";

function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Icon svg={ArrowLeftIcon} size="sm" />}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
        <h1 className={styles.title}>Редактирование товара #{id}</h1>
      </div>

      <div className={styles.placeholder}>
        <p>Форма редактирования товара — в разработке</p>
      </div>
    </div>
  );
}

export default ProductEditPage;
