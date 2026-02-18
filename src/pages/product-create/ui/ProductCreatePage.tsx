import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "@/shared/assets/icons";
import { Button, Icon, Input, Toast } from "@/shared/ui";

import styles from "./ProductCreatePage.module.css";

interface FormData {
  title: string;
  price: string;
  brand: string;
  sku: string;
}

interface FormErrors {
  title?: string;
  price?: string;
  brand?: string;
  sku?: string;
}

function ProductCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    title: "",
    price: "",
    brand: "",
    sku: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!form.title.trim()) next.title = "Введите наименование";
    if (!form.price.trim()) {
      next.price = "Введите цену";
    } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      next.price = "Цена должна быть положительным числом";
    }
    if (!form.brand.trim()) next.brand = "Введите вендора";
    if (!form.sku.trim()) next.sku = "Введите артикул";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    /* Сохраняем локально (без API по требованию) */
    console.log("Новый товар:", {
      title: form.title,
      price: Number(form.price),
      brand: form.brand,
      sku: form.sku,
    });

    setToastVisible(true);
    setForm({ title: "", price: "", brand: "", sku: "" });
  };

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
        <h1 className={styles.title}>Создание товара</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Наименование</label>
          <Input
            placeholder="Название товара"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Цена</label>
          <Input
            type="number"
            placeholder="0.00"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Вендор</label>
          <Input
            placeholder="Название бренда"
            value={form.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          />
          {errors.brand && <span className={styles.error}>{errors.brand}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Артикул</label>
          <Input
            placeholder="SKU-12345"
            value={form.sku}
            onChange={(e) => handleChange("sku", e.target.value)}
          />
          {errors.sku && <span className={styles.error}>{errors.sku}</span>}
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Добавить товар
        </Button>
      </form>

      <Toast
        message="Товар успешно добавлен!"
        variant="success"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default ProductCreatePage;
