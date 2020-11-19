function FindNumbersWithSum(arr, S) {
    let left = 0;
    let right = arr.length - 1
    let res = []
    while (left - right) {
        if (arr[left] + arr[right] < S) left++
            else if (arr[left] + arr[right] > S) right++
                else {
                    res.push(arr[left], arr[right])
                    break
                }
    }
    return res
}