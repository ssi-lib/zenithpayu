export function loanMonths(range) {
  const factor = 100 / 36;

  const months = range / factor;

  return Math.round(months);
}
