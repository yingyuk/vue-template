export function capitalizeFirstLetter(word) {
  const letters = word.split('');
  const first = letters.shift().toUpperCase();
  letters.unshift(first);
  return letters.join('');
}

export function formatMoney(str) {
  // return str.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  // return str.toFixed(0).replace(/(\d)(?=(\d{3})+\.?)/g, '$1,');
  const num = parseInt(str);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
