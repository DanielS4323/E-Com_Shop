export default function currencyFormat(number, currency = 'USD') {
  const CURRENCY_FORMATTER = new Intl.NumberFormat('en-IN', {
    currency: currency,
    style: 'currency',
  });

  return CURRENCY_FORMATTER.format(number);
}
