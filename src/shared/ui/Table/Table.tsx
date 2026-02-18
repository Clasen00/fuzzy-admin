import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

import { cn } from "@/shared/lib";

import styles from "./Table.module.css";

export type TableProps = HTMLAttributes<HTMLTableElement>;

export function Table({ className, children, ...rest }: TableProps) {
  return (
    <div className={styles.container}>
      <table className={cn(styles.table, className)} {...rest}>
        {children}
      </table>
    </div>
  );
}

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableHead({ className, children, ...rest }: TableHeadProps) {
  return (
    <thead className={cn(styles.head, className)} {...rest}>
      {children}
    </thead>
  );
}

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className, children, ...rest }: TableBodyProps) {
  return (
    <tbody className={className} {...rest}>
      {children}
    </tbody>
  );
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export function TableRow({
  selected = false,
  className,
  children,
  ...rest
}: TableRowProps) {
  return (
    <tr className={cn(styles.row, selected && styles.selected, className)} {...rest}>
      {children}
    </tr>
  );
}

export type TableHeadCellProps = ThHTMLAttributes<HTMLTableCellElement>;

export function TableHeadCell({ className, children, ...rest }: TableHeadCellProps) {
  return (
    <th className={cn(styles.th, className)} {...rest}>
      {children}
    </th>
  );
}

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({ className, children, ...rest }: TableCellProps) {
  return (
    <td className={cn(styles.td, className)} {...rest}>
      {children}
    </td>
  );
}
