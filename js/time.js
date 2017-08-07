function setDate() {
    var date = new Date();
    var d = date.toString();
    var d = d.slice(0, 16);
    document.getElementById('date').innerHTML = d;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    if (h === 0) {
        h = 12;
    }
    else if (h > 12) {
        h = h - 12;
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function setUserName() {
    var userName = localStorage.getItem('userLogin');
    userName=JSON.parse(userName);
    var username = userName.name;
    document.getElementById('username').innerHTML = "Hello " + username;
    document.getElementById('username').setAttribute('onclick', "window.location='mainpage.html'");
    document.getElementById('logout').setAttribute('onclick', "window.location='index.html';localStorage.removeItem('userLogin');");
}

function checkPrevious() {
    var userLogin = localStorage.getItem('userLogin');
    userLogin=JSON.parse(userLogin);
    if (userLogin !== null) {
        window.location="mainpage.html";
    }
}