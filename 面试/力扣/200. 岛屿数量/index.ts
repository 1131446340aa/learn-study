function numIslands (grid: string[][]): number {
  let res = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        if (
          grid[i][j - 1] === '1' ||
          grid[i][j + 1] === '1' ||
          (grid[i - 1] && grid[i - 1][j] === '1') ||
          (grid[i + 1] && grid[i + 1][j] === '1')
        ) {
          grid[i][j] = '0'
        } else {
          // console.log(grid[0][4])
          // console.log(i, j)
          res++
        }
      }
    }
  }

  return res
}

console.log(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
  ])
)
