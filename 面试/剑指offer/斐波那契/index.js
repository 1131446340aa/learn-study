function Fibonacci(n) {
    if (n === 0) return 0
    if (n === 1) return 1
    return Fibonacci(n - 1) + Fibonacci(n - 2)
}
// function Fibonacci(n) {
//     let f = 0
//     let g = 1
//     while (n--) {
//         g += f
//         f = g - f
//     }
//     return f
// }


console.log(Fibonacci(10));