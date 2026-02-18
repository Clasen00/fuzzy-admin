import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DeleteProductButton } from "@/features/product-delete";

import { productApi, type Product } from "@/entities/product";

import { ArrowLeftIcon, EditIcon } from "@/shared/assets/icons";
import { buildProductEditPath } from "@/shared/config";
import { Spinner, Button, Icon, Badge } from "@/shared/ui";

import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    productApi
      .getById(Number(id))
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className={styles.center}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.center}>
        <p className={styles.error}>{error ?? "Товар не найден"}</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    );
  }

  const statusBadge =
    product.stock > 0
      ? { label: "В наличии", variant: "success" as const }
      : { label: "Нет в наличии", variant: "danger" as const };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Icon svg={ArrowLeftIcon} size="sm" />}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Icon svg={EditIcon} size="sm" />}
            onClick={() => navigate(buildProductEditPath(product.id))}
          >
            Редактировать
          </Button>
          <DeleteProductButton
            productId={product.id}
            productTitle={product.title}
            onDeleted={() => navigate(-1)}
          />
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={product.thumbnail} alt={product.title} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Цена</span>
              <span className={styles.price}>${product.price}</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Скидка</span>
              <span>{product.discountPercentage}%</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Остаток</span>
              <span>{product.stock} шт.</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Рейтинг</span>
              <span>⭐ {product.rating}</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Категория</span>
              <span>{product.category}</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Статус</span>
              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {product.images && product.images.length > 1 && (
        <div className={styles.gallery}>
          {product.images.map((src, i) => (
            <img
              key={i}
              className={styles.thumb}
              src={src}
              alt={`${product.title} ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
