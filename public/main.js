var loginButton = document.getElementById("loginButton");
var registerButton = document.getElementById("registerButton");

// login Javascript
loginButton.onclick = async function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // check the field
    if(email == '' || password == ''){
        return alert("Please fill all required field!");
    }

    // object request
    var loginRequest = {
        email: email,
        password: password
    }

    // connect with API login
    let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(loginRequest)
    })

    // get the JSON response
    let response = await res.json();
    console.log(response);
}


