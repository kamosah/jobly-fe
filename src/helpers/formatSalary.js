/**
 * 
 */
function formatSalary(num) {
  let numStr = num.toString();
  let output = "";
  let counter = 0;
  for (let i = numStr.length - 1; i >= 0; i--) {
    if (counter === 3) {
      output = "," + output;
      counter = 0;
    }
    output = numStr[i] + output;
    counter++;
  }
  return "$" + output;
}

export default formatSalary;
