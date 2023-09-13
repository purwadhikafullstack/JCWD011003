function one () {
    return 2;
};

function multiply(arr, n) {
    if (n <= 0) {
      return 1; // Base case: when n is 0 or less, the product is 1.
    } else {
      return multiply(arr, n - 1) + arr[n - 1];
    }
  }

var arr = [2,3]
// console.log(one() * 2);
// console.log(multiply(arr,2));
var max = 12
var min = 2
// console.log(Math.floor(0.99 * (max - min + 1)) + min )

function rangeOfNumbers(startNum, endNum) {
    if (startNum == endNum){
      return [startNum]
    } else if (startNum >= endNum) {
    return [];
    } else {
      const arr = rangeOfNumbers(startNum + 1);
      arr.push(startNum);
      return arr
    }
  };

  console.log(rangeOfNumbers(1,2))
  