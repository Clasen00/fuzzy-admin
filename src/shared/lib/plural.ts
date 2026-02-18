/**
 * plural(1, ["товар", "товара", "товаров"]) → "товар"
 * plural(3, ["товар", "товара", "товаров"]) → "товара"
 * plural(5, ["товар", "товара", "товаров"]) → "товаров"
 */
export function plural(count: number, forms: [string, string, string]): string {
  const abs = Math.abs(count) % 100;
  const lastDigit = abs % 10;

  if (abs > 10 && abs < 20) return forms[2];
  if (lastDigit > 1 && lastDigit < 5) return forms[1];
  if (lastDigit === 1) return forms[0];

  return forms[2];
}
