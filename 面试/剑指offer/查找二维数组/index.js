/*
 * @Descripttion: 
 * @Date: 2020-07-21 16:01:18
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-23 14:12:06
 */
let array = [
    [1, 2],
    [3, 5]
]

function find(arr, item) {
    let i = arr.length - 1
    while (arr[i][0] > item) {
        i--
    }
    if (i >= 0) {
        for (let j = 0; j < arr[i].length; j++) {
            if (item == arr[i][j]) {
                return true
            }
        }
    }
}
console.log(find(array, 5));