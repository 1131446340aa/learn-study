function sumSubarrayMins(arr: number[]): number {
  let leftStack: number[] = []
  let rightStack: number[] = []
  let len = arr.length - 1
  let res = 0
  arr.forEach((item, index) => {
    if (index === 0) {
      leftStack.push(0)
    } else {
      if (item >= arr[index - 1]) {
        leftStack.push(leftStack[index - 1] + 1)
      } else {
        leftStack.push(0)
      }
    }
  })
  arr.reverse().forEach((item, index) => {
    if (index === 0) {
      rightStack.push(0)

    } else {
      if (item >= arr[index - 1]) {
        rightStack.push(leftStack[index - 1] + 1)
      } else {
        rightStack.push(0)
      }
    }
    res += (leftStack[len - index] + 1) * (rightStack[index] + 1) * item
  })
  console.log(leftStack, rightStack);

  return res
};

console.log(sumSubarrayMins([3, 1, 2, 4]));
