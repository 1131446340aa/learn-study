function printMatrix(matrix) {
    if (!matrix) return null
    let start = 0
    let res = []
    let col = matrix[0].length
    let row = matrix.length
    while (col > start * 2 && row > start * 2) {
        res = res.concat(printMatrixInCircle(matrix, col, row, start))
        start++
    }
}

function printMatrixInCircle(matrix, col, row, start) {
    let res = []
    const endX = col - 1 - start
    const endY = row - 1 - start
    for (let i = start; i <= endX; i++) {
        res.push(matrix[start][i])
    }
    for (let i = start + 1; i <= endY; i++) {
        res.push(matrix[i][endX])
    }
    for (let i = endX - 1; i >= start && endY > start; i--) {
        res.push(matrix[endY][i])
    }
    for (let i = endY - 1; i >= start && endX > start; i--) {
        res.push(matrix[i][start])
    }

}