function questSort(num: number[]) {
  if (num.length < 2) return num
  let len = num.length >> 2
  // console.log(len);

  let middle = num.splice(len, 1)[0]
  let left = []
  let right = []
  num.forEach(item => {
    if (item < middle) left.push(item)
    else right.push(item)
  })
  left = questSort(left)
  right = questSort(right)
  return [...left, middle, ...right]
}
console.log(questSort([2, 21, 3, 3, 23, 232, 3, 2, 32, 32]));
