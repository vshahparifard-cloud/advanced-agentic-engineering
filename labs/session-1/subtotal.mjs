export function subtotal(values) {
  if (!Array.isArray(values) || values.some(x => !Number.isFinite(x) || x < 0)) {
    throw new TypeError('Expected an array of finite non-negative numbers');
  }
  return values.reduce((sum, n) => sum + n, 0);
}
