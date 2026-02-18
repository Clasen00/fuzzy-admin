import { useState } from "react";

import { useAppDispatch } from "@/app/hooks";

import { deleteProduct } from "@/entities/product";

import { TrashIcon } from "@/shared/assets/icons";
import { IconButton, Icon } from "@/shared/ui";

import { ConfirmDialog } from "./ConfirmDialog";

interface DeleteProductButtonProps {
  productId: number;
  productTitle: string;
  onDeleted?: () => void;
}

export function DeleteProductButton({
  productId,
  productTitle,
  onDeleted,
}: DeleteProductButtonProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      onDeleted?.();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton
        icon={<Icon svg={TrashIcon} size="sm" />}
        variant="danger"
        size="sm"
        label={`Удалить ${productTitle}`}
        onClick={() => setOpen(true)}
      />

      {open && (
        <ConfirmDialog
          title="Удалить товар?"
          description={`Вы уверены, что хотите удалить «${productTitle}»? Это действие нельзя отменить.`}
          confirmLabel="Удалить"
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      )}
    </>
  );
}
