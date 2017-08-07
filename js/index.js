var signupName = document.getElementById('name');
var signupEmail = document.getElementById('email');
var signupPass = document.getElementById('pwd');

var loginEmail = document.getElementById('loginEmail');
var loginPass = document.getElementById('loginPassword');

function signup(){
if((!(signupName.value===""))&&(!(signupEmail.value===""))&&(!(signupPass.value===""))){
var check=checkEmail(signupEmail.value);
if(check){
var users= localStorage.getItem('users');
if(users !==null){
    users=JSON.parse(users);
}
else{
    users=[];
}

var flag=true;
for(var i=0;i<users.length;i++){
    if(users[i].email===(signupEmail.value).toLowerCase()){
        flag=false;
        break;
    }
}

if(flag){
var user={
name:signupName.value,
email:signupEmail.value,
password:signupPass.value
};
users.push(user);
users=JSON.stringify(users);
localStorage.setItem('users',users);
alert("User Registered Successfully!");
signupName.value="";
signupEmail.value="";
signupPass.value="";
}
else{
    alert("This email already exist try different one!");
}
}
else{
    alert('Please enter valid email address!');
}
}
else{
    // document.getElementById('valid').innerHTML="*Please fill out all fields you leave some empty!!";
    // document.getElementById('valid').style.color="red";
    alert("Please fill out all fields you leave some empty!!");
}
}

function login(){
    var userLogin;
    if ((!(loginEmail.value === "")) && (!(loginPass.value === ""))) {
        var users = localStorage.getItem('users');
        if (users !== null) {
            users = JSON.parse(users);

        var flag=false,index;
        for(var i=0;i<users.length;i++){
            if((users[i].email===loginEmail.value)&&(users[i].password===loginPass.value)){
                flag=true;
                userLogin=users[i];
                break;
            }
        }
        if(flag){
            userLogin=JSON.stringify(userLogin);
            localStorage.setItem('userLogin',userLogin);
            window.location="mainpage.html";
        }
        else{
                document.getElementById('valid').innerHTML="Login failed!!";
                document.getElementById('valid').style.color="red";
        }
        }
        else {
            users = [];
            document.getElementById('valid').innerHTML="Login failed!!";
            document.getElementById('valid').style.color="red";
        }
    }
    else if(((loginEmail.value===""))&&(!(loginPass.value===""))){
        alert("Please enter email then press Log In button!");
        loginEmail.focus();
    }
    else if((!(loginEmail.value===""))&&((loginPass.value===""))){
        alert("Please enter password then press Log In button!");
        loginPass.focus();
    }
    else if((loginEmail.value==="")&&(loginPass.value==="")){
        alert("Please enter email and password then press Log In button!");
        loginEmail.focus();
    }
}

function checkEmail(email){
//var pattern = new RegExp("");
var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(pattern.test(email)===true){
return true;
}
else{
    return false;
}
}