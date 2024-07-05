//show date in DD/MM/YYYY format
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const balanceCalculation = (fundname,expens) => {
  //console.log("KJ=>",expens);
  let cr_blance = 0
  let dr_blance = 0
  expens.forEach(element => {
    const amount = parseFloat(element.ammout);
    if (element.credit_to === fundname) {
      cr_blance += amount
    }
    if (element.debit_by === fundname) {
      dr_blance += amount
    }
  });
  return ({balance:Math.round(cr_blance - dr_blance),cr_blance,dr_blance});
}
export const balanceCalculationTransaction = (expens) => {
  //console.log("KJ=>",expens);
  let cr_blance = 0
  let dr_blance = 0
  expens.forEach(element => {
    const amount = parseFloat(element.ammout);
    if (element.credit_to) {
      cr_blance += amount
    }
    if (element.debit_by) {
      dr_blance += amount
    }
  });
  return ({balance:Math.round(cr_blance - dr_blance),cr_blance,dr_blance});
}
//parseFloat(number.toFixed(2))