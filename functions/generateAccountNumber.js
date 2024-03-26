export function generateAccountNumber() {
  const prefix = '539';
  let accountNumber = prefix;

  for (let i = 0; i < 9; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString();
  }

  return accountNumber;
}
