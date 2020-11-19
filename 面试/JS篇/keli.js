//颗粒化
function keli(...args) {
  // console.log(keli.value);
  if (keli.value === undefined) keli.value = 0;
  keli.value += args.reduce((all, item) => {
    return all + item;
  }, 0);

  return keli;
}

console.log(keli(3, 7, 7)(8)(3).value);
