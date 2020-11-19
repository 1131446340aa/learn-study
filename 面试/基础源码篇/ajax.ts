function ajax({ success, methods, params, url }) {
  let aja = new XMLHttpRequest();
  if (methods === 'get') {
    aja.open('get', url + params);
  } else {
    aja.open('post', url);
    aja.setRequestHeader('header', '');
    aja.send(params);
  }

  aja.onreadystatechange = function () {
    //大概是这个样子
    if (aja.readyState === 4) {
      if (aja.status === 200) {
        return success(JSON.parse(aja.responseText))
      }
    }
  };
}
