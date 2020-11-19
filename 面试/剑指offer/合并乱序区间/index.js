function merge(arr) {
    arr.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i][1] >= arr[i + 1][0]) {
            let rightMax = Math.max(arr[i][1], arr[i + 1][1])
            arr[i] = [arr[i][0], rightMax]
            arr.splice(i + 1, 1)
            i--

        }
    }
    return arr
}

console.log(merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18]
]));