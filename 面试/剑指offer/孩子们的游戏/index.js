function LastRemainingSolution(n, m) {
    let del = 0
    let child = []
    for (let i = 0; i < n; i++) {
        child[i] = i
    }
    while (child.length > 1) {
        const k = m - 1
        del = (del + k) % child.length
        child.splice(del, 1)
    }
    return child[0]
}