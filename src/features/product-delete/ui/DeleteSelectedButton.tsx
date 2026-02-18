import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { deleteProduct, deselectAll, selectSelectedIds } from "@/entities/product";

import { TrashIcon } from "@/shared/assets/icons";
import { Button, Icon } from "@/shared/ui";

import { ConfirmDialog } from "./ConfirmDialog";

interface DeleteSelectedButtonProps {
  onDeleted?: () => void;
}

export function DeleteSelectedButton({ onDeleted }: DeleteSelectedButtonProps) {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (selectedIds.length === 0) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await Promise.all(selectedIds.map((id) => dispatch(deleteProduct(id)).unwrap()));
      dispatch(deselectAll());
      onDeleted?.();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        leftIcon={<Icon svg={TrashIcon} size="sm" />}
        onClick={() => setOpen(true)}
      >
        Удалить ({selectedIds.length})
      </Button>

      {open && (
        <ConfirmDialog
          title="Удалить выбранные товары?"
          description={`Вы уверены, что хотите удалить ${selectedIds.length} товар(ов)? Это действие нельзя отменить.`}
          confirmLabel="Удалить"
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      )}
    </>
  );
}
