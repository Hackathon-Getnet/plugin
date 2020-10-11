var _gaq = _gaq || [];

var processedMsgSet = new Set();
var processedOldMsgSet = new Set();

var currentUserSet = "";

var styleToolbar = "<style>@import url('https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap'); .total {  text-align: center; font-size: 30px; font-family: 'Lexend Deca', sans-serif; margin-left: 20px; display: flex; align-items: center; overflow: hidden; cursor: pointer; justify-content: space-between; white-space: nowrap; transition: 0.3s;}</style>";

var toolbar = styleToolbar + '<div style="background: #232427;height: 150px;z-index: 999999999;">' +
    '<ul id="toolbar" style=" margin-top: 20px;font-size: 16px; color: #fff;">' +
    '<li class="menu1" style="float: left;margin-left: 25px;margin-right: 30px;" title="#TITLEMENU1">' +
    '<img style="width: 80px;margin-top: 40px; margin-left:10px;" id="imageLogo" src="https://www.hackathongetnet.com.br/wp-content/themes/getnet/img/logo.png" /></li>' +
    '<li id="menuHistMark" class="menu2" style="float: left;margin-left: 20px;" title="#TITLEMENU2"> </li>' +
    '<li id="sellmrkbtn" class="menu2" style="float: left;margin-left: 20px;" title="#TITLEMENU2"> </li>' +
    '<li class "menu2"title="#TITLEMENU2"> <span style="padding-top:40px; padding-left:20px;" class="total">Saldo<br/></span><span style="color: white; background: #09d261; " class="total" id="balance">R$500,00</span> </li>' +
    '</ul>' +
    '</div>';

var lncbut = document.getElementsByTagName('body')[0];
var lncbutDiv = document.createElement("div");

lncbutDiv.innerHTML = '<div class="right-side" style="padding:10px;!important; width:300px;!important; height:80px;!important; background-color:white;!important; ">  <div class="new" style="color:#16171a;!important">Registrar Venda</div>     <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 451.846 451.847"><path d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#cfcfcf"/></svg>  </div>';
// lncbutDiv.innerHTML = '<button class=\"button\">Registrar Venda</div>';

lncbutDiv.id = 'pg';
lncbutDiv.addEventListener("click", function (e) {
    document.getElementById('pg').style.visibility = 'hidden';

    var nameProduct = prompt("Qual produto vendido?", "");

    if (nameProduct == null || nameProduct == "") {
        txt = "User cancelled the prompt.";
        return;
    } else {
        console.log(nameProduct);
    }

    var value = prompt("Qual valor da venda?", "0.00");

    if (value == null || value == "") {
        txt = "User cancelled the prompt.";
        return;
    } else {
        console.log(value);
    }

    var map = new Object();
    map["value"] = value;
    map["product"] = nameProduct;
    map["user"] = currentUserSet.replace(/\s/g, '');
    // updated: this works with Chrome 30:
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("registerSell", true, true, map);
    document.dispatchEvent(evt);


});

var stylelancbut = "";
stylelancbut += "#pg { height: 40px; border-radius: 50px; width: 60px; background-color: #43d854;  ";
stylelancbut += "position: fixed; top: 15px; left: 15px; z-index: 99999; box-shadow: 0 1px 1px 0 rgba(0,0,0,0.06), 0 2px 5px 0 rgba(0,0,0,0.2);}";
stylelancbut += "#pg:hover { box-shadow: none; top:16px; cursor: pointer; }";
stylelancbut += "#pg.hide { display: none; }";
stylelancbut += "#pg.titleText {text-align: center; font-size: 13px; padding-top: 14px; color: white; }";
var styleElbtn = document.createElement("style");
styleElbtn.innerHTML = stylelancbut;


// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('texto');
}

// Make the actual CORS request.
function makeCorsRequest(text) {
    // This is a sample server that supports CORS.
    var url = 'https://...';

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
}



var didInsert = false;
var didInsertSide = false;

const broadcast = function (node) {
    console.log("broadcast is running");

    if (document.getElementById("main") && !document.getElementById("toolbar") && didInsert == false) {
        didInsert = true;
        const userName = document.getElementById("main").getElementsByClassName("_3ko75 _5h6Y_ _3Whw5")[0].innerHTML;
        console.log(userName);

        if (currentUserSet == userName) {
            return;
        }

        currentUserSet = userName;

        console.log("didInsert");

        document.getElementById("main").insertAdjacentHTML('afterbegin', toolbar);

        let sales = localStorage.getItem('sales');
        if (sales != undefined && sales != "") {
            sales = JSON.parse(sales);
        } else {
            sales = [];
        }
        let total = 0;
        for (let i = 0; i < sales.length; i++) {
            total += parseFloat(sales[i].value);
        }

        document.getElementById("balance").innerHTML = "R$" + total;

        addActivateBtn();
        addSellButton();
        document.head.innerHTML = document.head.innerHTML + " <style> .button {    background-color: #444AB0; /* Green */    border: none;    color: white;    padding: 15px 32px;    text-align: center;    text-decoration: none;    display: inline-block;    font-size: 16px;    margin: 4px 2px;    cursor: pointer;}</style> ";
        // console.log(document.head);

        // console.log("a");
        //Erro!
        // var xhr = new XMLHttpRequest();
        // xhr.open("GET", "https://...", true);
        // xhr.onreadystatechange = function() {
        //   if (xhr.readyState == 4) {
        //     console.log("IN!");
        //     console.log(xhr);
        //   }
        // }
        // xhr.send();

        setInterval(function () {
            didInsert = false;
        }, 3000);
    }

    const chatText = [...node.getElementsByClassName('_3Whw5 selectable-text invisible-space copyable-text')];

    chatText.forEach(function (el) {
        var spans = [...el.getElementsByTagName("span")];
        if (spans[0] != undefined) {
            var msg = spans[0].innerHTML;

            if (!processedMsgSet.has(msg) && msg.includes("ok, pode registrar a venda")) {
                el.appendChild(lncbutDiv);
                document.getElementById('pg').style.visibility = 'visible';
                processedMsgSet.add(msg);
            }
        }
    });
};

function fazerPG() {

}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    return xmlHttp.responseText;
}


function doFunction() {
    alert("EY!");
}


function addSellButton() {
    var body = document.getElementById('sellmrkbtn');
    console.log(body);
    var startBtnDiv = document.createElement("div");

    var styleSell = "<style>@import url('https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap'); :root { --background: #33837e; --left-side: #5de2a3; --card: #c7ffbc; --card-line: #80ea69; --button-color-3: #26850e; --button-color-2: #379e1f; --button-color-1: #56be3e; --post: #dddde0; --numbers: #838183; --numbers-2: #aaa9ab; --post-line: #757375; --post-line2: #545354; --dollar: #4b953b;}html { box-sizing: border-box; -webkit-font-smoothing: antialiased;}body { min-height: 100vh; display: flex; justify-content: center; align-items: center; overflow: hidden; width: 100%; background: var(--background);}.container { background-color: #ffffff; display: flex; width: 300px; height: 120px; position: relative; border-radius: 6px; transition: 0.3s ease-in-out;  &:before {  width: 200vw;  position: absolute;  top: 0;  left: -100vw;  height: 100%;  content: ''; } &:hover {  transform: scale(1.03);  width: 220px;  .left-side {   width: 100%;  } }}.left-side { background-color: var(--left-side); width: 130px; height: 120px; border-radius: 4px; position: relative; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: 0.3s; flex-shrink: 0; overflow: hidden;}.right-side { width: calc(100% - 130px); display: flex; align-items: center; overflow: hidden; cursor: pointer; justify-content: space-between; white-space: nowrap; transition: 0.3s; &:hover {  background-color: #f9f7f9; }}.arrow { width: 20px; height: 20px; margin-right: 20px;}.new { font-size: 23px; font-family: 'Lexend Deca', sans-serif; margin-left: 20px;}.card { width: 70px; height: 46px; background-color: var(--card); border-radius: 6px; position: absolute; display: flex; z-index: 10; flex-direction: column; align-items: center; -webkit-box-shadow: 9px 9px 9px -2px rgba(77, 200, 143, 0.72); -moz-box-shadow: 9px 9px 9px -2px rgba(77, 200, 143, 0.72);-webkit-box-shadow: 9px 9px 9px -2px rgba(77, 200, 143, 0.72);}.card-line { width: 65px; height: 13px; background-color: var(--card-line); border-radius: 2px; margin-top: 7px;}@media only screen and (max-width: 480px) { .container {  transform: scale(0.7);  &:hover {   transform: scale(0.74);  } } .new {  font-size: 18px; }}.buttons { width: 8px; height: 8px; background-color: var(--button-color-2); box-shadow: 0 -10px 0 0 var(--button-color-3), 0 10px 0 0 var(--button-color-1); border-radius: 50%; margin-top: 5px; transform: rotate(90deg); margin: 10px 0 0 -30px;}.container:hover .card { animation: slide-top 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;}.container:hover .post { animation: slide-post 1s cubic-bezier(0.165, 0.84, 0.44, 1) both;}@keyframes slide-top { 0% {  -webkit-transform: translateY(0);  transform: translateY(0); } 50% {  -webkit-transform: translateY(-70px) rotate(90deg);  transform: translateY(-70px) rotate(90deg); } 60% {  -webkit-transform: translateY(-70px) rotate(90deg);  transform: translateY(-70px) rotate(90deg); } 100% {  -webkit-transform: translateY(-8px) rotate(90deg);  transform: translateY(-8px) rotate(90deg); }}.post { width: 63px; height: 75px; background-color: var(--post); position: absolute; z-index: 11; bottom: 10px; top: 120px; border-radius: 6px; overflow: hidden;}.post-line { width: 47px; height: 9px; background-color: var(--post-line2); position: absolute; border-radius: 0px 0px 3px 3px; right: 8px; top: 8px; &:before {  content: '';  position: absolute;  width: 47px;  height: 9px;  background-color: var(--post-line);  top: -8px; }}.screen { width: 47px; height: 23px; background-color: #ffffff; position: absolute; top: 22px; right: 8px; border-radius: 3px;}.numbers { width: 12px; height: 12px; background-color: var(--numbers); box-shadow: 0 -18px 0 0 var(--numbers), 0 18px 0 0 var(--numbers); border-radius: 2px; position: absolute; transform: rotate(90deg); left: 25px; top: 52px;}.numbers-line2 { width: 12px; height: 12px; background-color: var(--numbers-2); box-shadow: 0 -18px 0 0 var(--numbers-2), 0 18px 0 0 var(--numbers-2); border-radius: 2px; position: absolute; transform: rotate(90deg); left: 25px; top: 68px;}@keyframes slide-post { 50% {  -webkit-transform: translateY(0);  transform: translateY(0); } 100% {  -webkit-transform: translateY(-70px);  transform: translateY(-70px); }}.dollar { position: absolute; font-size: 16px; font-family: 'Lexend Deca', sans-serif; width:100%;  left: 0; top: 0; color: var(--dollar); text-align: center;}.container:hover .dollar { animation: fade-in-fwd 0.3s 1s backwards;}@keyframes fade-in-fwd { 0% {  opacity: 0;  transform: translateY(-5px); } 100% {  opacity: 1;  transform: translateY(0); }}</style>";

    var buttonSell = '<div class="container"> <div class="left-side">  <div class="card">   <div class="card-line"></div>   <div class="buttons"></div>  </div>  <div class="post">   <div class="post-line"></div>   <div class="screen"><div class="dollar">$</div>   </div>   <div class="numbers"></div>   <div class="numbers-line2"></div>  </div> </div> <div class="right-side">  <div class="new" style="color:#16171a;!important">Registrar</div>     <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 451.846 451.847"><path d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#cfcfcf"/></svg>  </div></div>';


    startBtnDiv.innerHTML = '<div class="titleText">' + styleSell + buttonSell + '</div>';
    startBtnDiv.id = 'sellbuttonmrk';
    startBtnDiv.addEventListener("click", function (e) {
        var nameProduct = prompt("Qual produto vendido?", "");

        if (nameProduct == null || nameProduct == "") {
            txt = "User cancelled the prompt.";
            return;
        } else {
            console.log(nameProduct);
        }

        var value = prompt("Qual valor da venda?", "0.00");

        if (value == null || value == "") {
            txt = "User cancelled the prompt.";
            return;
        } else {
            console.log(value);
        }

        var map = new Object();
        map["value"] = value;
        map["product"] = nameProduct;
        map["user"] = currentUserSet.replace(/\s/g, '');
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("registerSell", true, true, map);
        document.dispatchEvent(evt);
    });

    body.appendChild(startBtnDiv);
}

// Button to enable the UI
function addActivateBtn() {
    var body = document.getElementById('menuHistMark');

    var startBtnDiv = document.createElement("div");


    var styleHistory = '<style>@import url("https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap"); :root {--background: #d74e68;--left-side: #ff9568;--smile: #ffe073;--star: #d74e68;--arrow: cfcfcf;} html {box-sizing: border-box;-webkit-font-smoothing: antialiased;} body {min-height: 100vh;display: flex;justify-content: center;align-items: center;overflow: hidden;width: 100%;background: var(--background);} .container {background-color: #ffffff;display: flex;width: 300px;height: 120px;position: relative;border-radius: 6px;transition: 0.3s ease-in-out;&:hover {transform: scale(1.04);}}.left-side {background-color: var(--left-side);width: 130px;height: 120px;border-radius: 6px;position: relative;display: flex;justify-content: center;align-items: center;cursor: pointer;transition: 0.3s;overflow: hidden;} .right-side {width: calc(100% - 130px);display: flex;align-items: center;overflow: hidden;cursor: pointer;justify-content: space-between;white-space: nowrap;transition: 0.3s;border-radius: 6px;&:hover {background-color: #f9f7f9;}} .arrow {width: 20px;height: 20px;margin-right: 20px;} .refer {font-size: 23px;font-family: "Lexend Deca", sans-serif;margin-left: 20px;} .smile {width: 60px;height: 60px;border-radius: 50%;background-color: var(--smile);position: absolute;display: flex;align-items: center;-webkit-box-shadow: 2px 5px 10px -2px rgba(0,0,0, .2);} .eyes {width: 6px;height: 10px;position: absolute;box-shadow: -15px 0 0 0 #000, 15px 0 0 0 #000;border-radius: 50%;left: 27px;top: 20px;} .mouth {width: 36px;height: 18px;background-color: #000;position: absolute;border-radius: 0 0 60px 60px;top: 35px;left: 12px;} .container:hover {& .smile {animation: slide-cross .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;}& .eyes, & .mouth {animation: slide-bottom .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;}& .talk {animation: scale-up .4s cubic-bezier(0.390, 0.575, 0.565, 1.000) .3s both;}& .star {animation: turning .5s ease-in-out .5s both;}& .friend {animation: slide-in .7s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;}& .shock {animation: wow .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) .4s both;}} @keyframes wow {0% {transform: scale(.9);}100% {        transform: scale(1.2);}} @keyframes slide-in { 100% {right: -45px;top: 35px;}}@keyframes turning {0% {    transform: rotate(-160deg) scale(0);    opacity: 0;   }85% {        transform: rotate(0) scale(1.5);        opacity: 1;} 100% {        transform: rotate(0) scale(1);        opacity: 1;}}@keyframes scale-up {0% {        transform: scale(0.6);        transform-origin: 100% 100%;       }100% {        transform: scale(1);        transform-origin: 100% 100%;        opacity: 1;}}@keyframes slide-cross {0% {    transform: translateY(0) translateX(0);}100% {    transform: translateY(-38px) translateX(-41px);}}@keyframes slide-bottom {0% {        transform: translateY(0) translateX(0);}100% {        transform: translateY(1px) translateX(5px);}}.talk {width: 56px;height: 40px;border-radius: 10px;background-color: #fff;position: absolute;z-index: 10;bottom: 34px;left: 33px;opacity: 0;}.triangle {position: absolute;    background-color: #fff;top: -9px;left: 8px;}.triangle:before,.triangle:after {    content: "";    position: absolute;    background-color: inherit;}.triangle,.triangle:before,.triangle:after {    width:  12px;    height: 12px;    border-top-right-radius: 35%;}.triangle {    transform: rotate(-85deg) skewX(-30deg) scale(1,.866);&:before {    transform: rotate(135deg) skewY(-45deg) scale(.707,1.414)   translate(50%);}}.star {width: 18px;height: 18px;position: absolute;left: 20px;top: 10px;}.friend {width: 60px;height: 60px;border-radius: 50%;background-color: var(--smile);position: relative;right: -85px;top: 85px;z-index: 15;box-shadow: 2px 5px 10px -2px rgba(0,0,0, .2);&:before {content: "";width: 6px;height: 10px;position: absolute;box-shadow: -15px 0 0 0 #000, 15px 0 0 0 #000;border-radius: 50%;left: 24px;top: 18px;}}.shock {width: 12px;height: 12px;background-color: #000;position: absolute;border-radius: 50%;top: 34px;right: 28px;will-change: transform;}@media only screen and (max-width: 480px) {.container {transform: scale(0.7);&:hover {transform: scale(0.74);}}.refer {font-size: 18px;}}</style>';
    var buttonHistory = '<div class="container"><div class="left-side"> <img style="width:80px;" src="https://www.flaticon.com/svg/static/icons/svg/639/639365.svg"></img></div><div class="right-side"> <div class="refer" style="color:#16171a;!important">Histórico</div></div></div>';

    startBtnDiv.innerHTML = '<div class="titleText">' + styleHistory + buttonHistory + '</div>';
    startBtnDiv.id = 'btnOpenWhatsAllApp';
    startBtnDiv.addEventListener("click", function (e) {

        var map = new Object(); 
        map["user"] = currentUserSet.replace(/\s/g, '');;
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("getSells", true, true, map);
        document.dispatchEvent(evt);
    });

    var style = "";
    style += "#btnOpenWhatsAllApp { height: 70px; border-radius: 50px; width: 70px; background-color: #43d854;  ";
    style += "position: fixed; top: 15px; left: 15px; z-index: 99999; box-shadow: 0 1px 1px 0 rgba(0,0,0,0.06), 0 2px 5px 0 rgba(0,0,0,0.2);}";
    style += "#btnOpenWhatsAllApp:hover { box-shadow: none; top:16px; cursor: pointer; }";
    style += "#btnOpenWhatsAllApp.hide { display: none; }";
    style += "#btnOpenWhatsAllApp .titleText {text-align: center; font-size: 13px; padding-top: 14px; color: white; }";
    var styleEl = document.createElement("style");
    styleEl.innerHTML = style;
    body.appendChild(startBtnDiv);
}

const observer = new MutationObserver(function (mutations) {
    broadcast(document.body);
});

const config = {
    attributes: true,
    childList: true,
    characterData: false,
    subtree: true
}

observer.observe(document.body, config);
