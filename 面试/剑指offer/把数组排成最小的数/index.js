function PrintMinNumber(arr) {
    arr.sort((a, b) => {
        let s1 = a + '' + b
        let s2 = b + '' + a
        return s1 > s2
    })
    let res = ""
    arr.forEach(item => {
        res += item
    })
}