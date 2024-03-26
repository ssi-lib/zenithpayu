export function calculateLoanDetails(loanAmount, months) {
  const annualInterestRate = 0.03;
  const monthlyInterestRate = annualInterestRate / 12;

  const monthlyPayment =
    (monthlyInterestRate * loanAmount) /
    (1 - Math.pow(1 + monthlyInterestRate, -months));

  const totalPayment = monthlyPayment * months;

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
  };
}
