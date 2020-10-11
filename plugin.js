function injectJs(link) {
  var scr = document.createElement("script");
  scr.type = "text/javascript";
  scr.src = link;
  (document.head || document.body || document.documentElement).appendChild(scr);
}

document.addEventListener('registerSell', function (e) {
  var data = e.detail;

  var order = '{ "value":"' + data["value"] + '", "description": "' + data["product"] + '", "date": "11/10/2020", "name":"' + data["user"] + '"}';

  let sales = localStorage.getItem('sales');
  if (sales != undefined && sales != "") {
    sales = JSON.parse(sales);
  } else {
    sales = [];
  }

  sales.push(JSON.parse(order));

  localStorage.setItem('sales', JSON.stringify(sales));

  let total = 0;
  for (let i = 0; i < sales.length; i++) {
    total += parseFloat(sales[i].value);
  }

  document.getElementById("balance").innerHTML = "R$" + total;

  // chrome.runtime.sendMessage({
  //     method: 'POST',
  //     action: 'xhttp',
  //     url: ' http://...',
  //     data: sendString
  // }, function(responseText) {
  //     // alert(responseText);
  //     console.log(responseText);
  //     /*Callback function to deal with the response*/
  // });

});

document.addEventListener('getSells', function (e) {

  var response = JSON.parse(localStorage.getItem('sales'));
  var vals = [];

  response.forEach(function (el) {
    vals.push(el.description + " - " + el.value);
  });

  alert(vals.join('\n'))
  console.log(responseText);

  // var data = e.detail;
  // console.log("received " + data);
  // // var sendString = '{ "value":"'+ data["value"] + '", "description": "TATTO YX", "date": "11/10/2020", "name":"'+data["user"]+'"}';
  // var saleUrl = 'http://...' + data["user"]
  // console.log(saleUrl);
  // chrome.runtime.sendMessage({
  //   method: 'GET',
  //   action: 'xhttp',
  //   url: saleUrl,
  //   data: ""
  // }, function (responseText) {

  //   /*Callback function to deal with the response*/
  // });

});

injectJs(chrome.extension.getURL("/index.js"));