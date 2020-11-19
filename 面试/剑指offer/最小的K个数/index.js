function GetLeastNumbersSolution(input, k) {
  let res = [];
  input.forEach((item, index) => {
    if (!res.length) {
      res.push(item);
    } else {
      if (res.length <= k) {
        if (item < res[0]) {
          res.unshift(item);
        } else {
          res.push(item);
        }
      } else {
        if (item < res[res.length - 1]) {
          res.pop();
        }
      }
    }
  });
}
