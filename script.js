//global variables
let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

//body style
function bodyStyle() {
    let bodyStyleSet = document.querySelector('body');
    bodyStyleSet.setAttribute('style', 'margin:0;background-color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;');
}

//loader function
function loader() {
    let loaderStyle = document.createElement('style');
    loaderStyle.innerHTML = `
        #loader-image {
            width: 200px;
            height: 150px;
            display: block;
            margin-bottom: 20px; /* Space between logo and text */
        }

        #loader-container {
            width: 400px;
            height: 2px;
            background-color: #ddd;
            overflow: hidden;
            position: relative;
            margin-top: 20px; /* Space between text and loader */
        }

        #loader {
            width: 0;
            height: 2px;
            background-color: #9B94B7;
            transition: width 2s ease-out;
        }

        /* Center everything in the middle of the screen */
        #loader-logo {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `;
    document.head.appendChild(loaderStyle);

    let loaderLogoDiv = document.createElement('div');
    loaderLogoDiv.id = 'loader-logo';

    let loaderImage = document.createElement('img');
    loaderImage.id = 'loader-image';
    loaderImage.setAttribute('src', 'images/ifify_logo.png');
    loaderImage.setAttribute('alt', 'Ifify LOGO');

    let loaderText = document.createElement('p');
    loaderText.innerText = "Where Curiosity Meets Conversation";
    loaderText.style.cssText = 'color:#9B94B7; font-family: "Brush Script MT", cursive; font-size:30px; margin: 0;';

    let loaderContainer = document.createElement('div');
    loaderContainer.id = 'loader-container';
    let loaderBar = document.createElement('div');
    loaderBar.id = 'loader';

    loaderContainer.appendChild(loaderBar);

    loaderLogoDiv.appendChild(loaderImage);
    loaderLogoDiv.appendChild(loaderText);
    loaderLogoDiv.appendChild(loaderContainer);

    document.body.appendChild(loaderLogoDiv);

    window.onload = function () {
        document.getElementById('loader').style.width = '100%';

        setTimeout(() => {
            loaderLogoDiv.style.display = 'none';
            document.getElementById('mainDiv').style.display = 'block';

            let pageState = localStorage.getItem('pageState');

            if (!pageState) {
                pageState = 'signIn';
                localStorage.setItem('pageState', 'signIn');
            }

            if (pageState === 'mainFeed') {
                mainFeed();
            } else if (pageState === 'signUp') {
                signUp();
            } else {
                signIn();
            }
        }, 2500);
    };
}

// SignIn Function
function signIn() {
    let style = document.createElement('style');
    style.innerHTML = `
        .inputField {
            width: 445px;
            height: auto;
            border: none;  
            border-bottom: 1px solid grey;
            font-size: 1rem;
            transition: font-size 0.3s, transform 0.3s;
        }

        .inputField:focus {
            border: none; 
            outline: none;
        }

        .inputField.active {
            border: none; 
            font-size: 1rem;
            transform: none;
            border-bottom: 1px solid grey;
        }

        label {
            width: 445px;
            height: 20px;
            font-size: 1.2rem;
            color: grey;
            text-align: left;
            transition: font-size 0.3s, transform 0.3s, color 0.3s;
        }

        label.active {
            font-size: 0.75rem; 
            transform: translateY(-10px);
        }

        #signIn-button {
            height:40px;
            width:450px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            background-color:#9B94B7;
            color:white;
            border:none;
            box-shadow:0px 0px 1px 1px #D6CE93;
            font-size:20px;
            font-weight:bold;
            border-radius:2px;
            transition: background-color 0.3s, transform 0.3s;
        }

        #signIn-button:hover {
            background-color: #6a5acd;
            color: white;
        }

        #spanIdSignUp {
            color: #9B94B7;
            font-weight:bold;
            font-family: Arial, sans-serif;
            cursor: pointer;
        }

        #spanIdSignUp:hover {
            color: #6a5acd; /* Change to a darker color or your preferred hover effect */
        }

        .error-border {
            border-bottom: 2px solid #FA8072 !important;
        }

        .error-label {
            color: #FA8072;  
        }
    `;
    document.head.appendChild(style);

    let mainDiv = document.getElementById('mainDiv');
    mainDiv.innerHTML = '';
    mainDiv.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;");

    let AnimationDiv = document.createElement('div');
    AnimationDiv.setAttribute('id', 'signIn-animation');
    let signInAnimation = document.createElement('img');
    signInAnimation.setAttribute('src', 'https://i.pinimg.com/originals/5d/14/ab/5d14abb4cd02c1f3b0c49184b377da83.gif');
    signInAnimation.setAttribute('style', 'height:auto;width:500px;');

    let loginContainer = document.createElement('div');
    loginContainer.setAttribute('id', 'signIn-container');
    loginContainer.setAttribute("style", "margin-right:100px;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;height:500px;width:500px;border:2px solid lavender;border-radius:5px;background-color:#FFFFFF;");

    let logoDiv = document.createElement('div');
    logoDiv.setAttribute('style', 'height:100px;width:450px;display:flex;justify-content:center;align-items:center;');
    let logo = document.createElement('img');
    logo.setAttribute('src', 'images/ifify_logo.png');
    logo.setAttribute('style', 'height:110px;width:150px;');

    let welcomeLabel = document.createElement('div');
    welcomeLabel.setAttribute('style', 'height:80px;width:450px;display:flex;justify-content:center;align-items:flex-start;');
    let welcome = document.createElement('h1');
    welcome.setAttribute('style', 'font-size:30px;')
    welcome.innerText = "Welcome back!";

    let userDiv = document.createElement('div');
    userDiv.setAttribute('style', 'height:50px;width:450px;margin-top:30px;display:flex;flex-direction:column;justify-content:center;align-items:center;');
    let userLabel = document.createElement('label');
    userLabel.innerText = "USERNAME";
    let userTextBox = document.createElement('input');
    userTextBox.setAttribute('id', 'username');
    userTextBox.setAttribute('class', 'inputField');
    userTextBox.setAttribute('type', 'text');
    userTextBox.setAttribute('autocomplete', 'off');

    userTextBox.addEventListener('focus', function () {
        this.classList.add('active');
        userLabel.classList.add('active');
    });
    userTextBox.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('active');
            userLabel.classList.remove('active');
        }
    });

    let userNameValidationDiv = document.createElement('div');
    userNameValidationDiv.setAttribute('style', 'color:#FA8072;height:20px;width:450px;font-size:10px;font-family: Arial, sans-serif;');

    let passwordDiv = document.createElement('div');
    passwordDiv.setAttribute('style', 'height:50px;width:450px;margin-top:10px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;');

    let passwordLabel = document.createElement('label');
    passwordLabel.innerText = "PASSWORD";

    let passwordTextBox = document.createElement('input');
    passwordTextBox.setAttribute('id', 'password');
    passwordTextBox.setAttribute('class', 'inputField');
    passwordTextBox.setAttribute('type', 'password');
    passwordTextBox.setAttribute('autocomplete', 'off');

    let passwordToggleText = document.createElement('span');
    passwordToggleText.setAttribute('id', 'toggle-password');
    passwordToggleText.innerText = "Show";
    passwordToggleText.setAttribute('style', 'cursor:pointer; color: #000000;font-weight:bold;font-size:15px;font-family: Arial, sans-serif; position: absolute; right: 0; top: 50%; transform: translateY(-50%);');

    passwordToggleText.addEventListener('click', function () {
        if (passwordTextBox.type === "password") {
            passwordTextBox.type = "text";
            passwordToggleText.innerText = "Hide";
        } else {
            passwordTextBox.type = "password";
            passwordToggleText.innerText = "Show";
        }
    });

    passwordTextBox.addEventListener('focus', function () {
        this.classList.add('active');
        passwordLabel.classList.add('active');
    });
    passwordTextBox.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('active');
            passwordLabel.classList.remove('active');
        }
    });

    let passwordValidationDiv = document.createElement('div');
    passwordValidationDiv.setAttribute('style', 'color:#FA8072;height:20px;width:450px;font-size:10px;font-family: Arial, sans-serif;');

    userTextBox.addEventListener('input', function () {
        const username = this.value;
        const usernameRegex = /^[A-Za-z]+$/;

        if (!usernameRegex.test(username)) {
            userTextBox.classList.add('error-border');
            userLabel.classList.add('error-label');
            userNameValidationDiv.innerHTML = "Username must contain only letters.";
        } else {
            userTextBox.classList.remove('error-border');
            userLabel.classList.remove('error-label');
            userNameValidationDiv.innerHTML = "";
        }
    });

    passwordTextBox.addEventListener('input', function () {
        const password = this.value;
        const passwordRegex = /^[A-Za-z0-9]{6}$/;

        if (!passwordRegex.test(password)) {
            passwordTextBox.classList.add('error-border');
            passwordLabel.classList.add('error-label');
            passwordValidationDiv.innerHTML = "Password must be exactly 6 alphanumeric characters.";
        } else {
            passwordTextBox.classList.remove('error-border');
            passwordLabel.classList.remove('error-label');
            passwordValidationDiv.innerHTML = "";
        }
    });

    let signInButtonDiv = document.createElement('div');
    signInButtonDiv.setAttribute('style', 'height:40px;width:450px;margin-top:20px;display:flex;flex-direction:column;justify-content:center;align-items:center;');
    let signInButton = document.createElement('input');
    signInButton.setAttribute('type', 'submit');
    signInButton.setAttribute('id', 'signIn-button');
    signInButton.setAttribute('value', 'Sign In');

    signInButton.addEventListener('click', function () {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        // Reset all previous error styles and messages
        userTextBox.classList.remove('error-border');
        userLabel.classList.remove('error-label');
        userNameValidationDiv.innerHTML = "";

        passwordTextBox.classList.remove('error-border');
        passwordLabel.classList.remove('error-label');
        passwordValidationDiv.innerHTML = "";

        let isValid = true;

        // Check if username or password is empty
        if (username === "" || password === "") {
            if (username === "") {
                userNameValidationDiv.innerHTML = "Username is required.";
                userTextBox.classList.add('error-border');
                userLabel.classList.add('error-label');
            }

            if (password === "") {
                passwordValidationDiv.innerHTML = "Password is required.";
                passwordTextBox.classList.add('error-border');
                passwordLabel.classList.add('error-label');
            }
            isValid = false;
        }

        if (!isValid) return; // Prevent further validation if fields are empty

        // Load all users from localStorage
        let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

        // Username validation
        const usernameRegex = /^[A-Za-z]+$/;
        if (!usernameRegex.test(username)) {
            userNameValidationDiv.innerHTML = "Username must contain only letters.";
            userTextBox.classList.add('error-border');
            userLabel.classList.add('error-label');
            isValid = false;
        }

        // Password validation
        const passwordRegex = /^[A-Za-z0-9]{6}$/;
        if (!passwordRegex.test(password)) {
            passwordValidationDiv.innerHTML = "Password must be exactly 6 alphanumeric characters.";
            passwordTextBox.classList.add('error-border');
            passwordLabel.classList.add('error-label');
            isValid = false;
        }

        // Proceed if validation passes
        if (!isValid) return; // Stop execution if there were errors

        // Find the user in all users
        let user = allUsers.find(u => u.username === username && u.password === password);

        // If the user exists, log in
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            smallLoader(mainFeed);
        } else {
            // If no user found, show an inline error message
            userNameValidationDiv.innerHTML = "Invalid username or password. Please try again.";
            userTextBox.classList.add('error-border');
            userLabel.classList.add('error-label');
            passwordValidationDiv.innerHTML = "Invalid username or password. Please try again.";
            passwordTextBox.classList.add('error-border');
            passwordLabel.classList.add('error-label');
        }
    });



    let signUpToggleDiv = document.createElement('div');
    signUpToggleDiv.setAttribute('style', 'height:30px;width:450px;margin-top:20px;display:flex;flex-direction:column;justify-content:center;align-items:center;');
    let signUpToggle = document.createElement('p');
    signUpToggle.innerHTML = `Don't have an account? <span id="spanIdSignUp">Sign Up</span>`;

    const signUpSpan = signUpToggle.querySelector('span');
    signUpSpan.addEventListener('click', function () {
        localStorage.setItem('pageState', 'signUp');
        signUp();
    });

    // Adding Children
    logoDiv.appendChild(logo);
    loginContainer.appendChild(logoDiv);

    welcomeLabel.appendChild(welcome);
    loginContainer.appendChild(welcomeLabel);

    userDiv.appendChild(userLabel);
    userDiv.appendChild(userTextBox);
    loginContainer.appendChild(userDiv);

    loginContainer.appendChild(userNameValidationDiv);

    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordTextBox);
    passwordDiv.appendChild(passwordToggleText);
    loginContainer.appendChild(passwordDiv);

    loginContainer.appendChild(passwordValidationDiv);

    loginContainer.appendChild(signInButtonDiv);
    signInButtonDiv.appendChild(signInButton);

    signUpToggleDiv.appendChild(signUpToggle);
    loginContainer.appendChild(signUpToggleDiv);

    AnimationDiv.appendChild(signInAnimation);
    mainDiv.appendChild(AnimationDiv);
    mainDiv.appendChild(loginContainer);
}

// SignUp Function
function signUp() {
    let style = document.createElement('style');
    style.innerHTML = `
        .inputField {
            width: 445px;
            height: auto;
            border: none;  
            border-bottom: 1px solid grey;
            font-size: 1rem;
            transition: font-size 0.3s, transform 0.3s;
        }

        .inputField:focus {
            border: none; 
            outline: none;
        }

        .inputField.active {
            border: none; 
            font-size: 1rem;
            transform: none;
            border-bottom: 1px solid grey;
        }

        label {
            width: 445px;
            height: 20px;
            font-size: 1.2rem;
            color: grey;
            text-align: left;
            transition: font-size 0.3s, transform 0.3s, color 0.3s;
        }

        label.active {
            font-size: 0.75rem; 
            transform: translateY(-10px);
        }

        #signUp-button {
            height:40px;
            width:450px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            background-color:#9B94B7;
            color:white;
            border:none;
            box-shadow:0px 0px 1px 1px #D6CE93;
            font-size:20px;
            font-weight:bold;
            border-radius:2px;
            transition: background-color 0.3s, transform 0.3s;
        }

        #spanIdSignIn {
            color: #9B94B7;
            font-weight:bold;
            font-family: Arial, sans-serif;
            cursor: pointer;
        }

        #spanIdSignIn:hover {
            color: #6a5acd; /* Change to a darker color or your preferred hover effect */
        }

        #signUp-button:hover {
            background-color: #6a5acd;
            color: white;
        }

        .error-border {
            border-bottom: 2px solid #FA8072 !important;
        }

        .error-label {
            color: #FA8072;  
        }
    `;
    document.head.appendChild(style);

    let mainDiv = document.getElementById('mainDiv');
    mainDiv.innerHTML = '';
    mainDiv.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;");

    let AnimationDiv = document.createElement('div');
    AnimationDiv.setAttribute('id', 'signUp-animation');
    let signUpAnimation = document.createElement('img');
    signUpAnimation.setAttribute('src', 'https://cdn.pixabay.com/animation/2023/06/30/07/30/07-30-05-456_512.gif');
    signUpAnimation.setAttribute('style', 'height:auto;width:500px;margin-left:20px;');

    let loginContainer = document.createElement('div');
    loginContainer.setAttribute('id', 'signUp-container');
    loginContainer.setAttribute("style", "margin-left:150px;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;height:610px;width:500px;border:2px solid lavender;border-radius:5px;background-color:#FFFFFF;");

    let logoDiv = document.createElement('div');
    logoDiv.setAttribute('style', 'height:100px;width:450px;display:flex;justify-content:center;align-items:center;');
    let logo = document.createElement('img');
    logo.setAttribute('src', 'images/ifify_logo.png');
    logo.setAttribute('style', 'height:110px;width:150px;');

    let welcomeLabel = document.createElement('div');
    welcomeLabel.setAttribute('style', 'height:80px;width:450px;display:flex;justify-content:center;align-items:flex-start;');
    let welcome = document.createElement('h1');
    welcome.setAttribute('style', 'font-size:23px;font-family: Arial, sans-serif;')
    welcome.innerText = "Don’t just watch the fun—be part of it!";

    let userDiv = document.createElement('div');
    userDiv.setAttribute('style', 'height:50px;width:450px;margin-top:40px;display:flex;flex-direction:column;justify-content:center;align-items:center;');
    let userLabel = document.createElement('label');
    userLabel.innerText = "USERNAME";
    let userTextBox = document.createElement('input');
    userTextBox.setAttribute('id', 'username');
    userTextBox.setAttribute('class', 'inputField');
    userTextBox.setAttribute('type', 'text');
    userTextBox.setAttribute('autocomplete', 'off');

    userTextBox.addEventListener('focus', function () {
        this.classList.add('active');
        userLabel.classList.add('active');
    });
    userTextBox.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('active');
            userLabel.classList.remove('active');
        }
    });

    let userNameValidationDiv = document.createElement('div');
    userNameValidationDiv.setAttribute('style', 'color:#FA8072;height:20px;width:450px;font-size:10px;font-family: Arial, sans-serif;');

    let passwordDiv = document.createElement('div');
    passwordDiv.setAttribute('style', 'height:50px;width:450px;margin-top:10px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;');

    let passwordLabel = document.createElement('label');
    passwordLabel.innerText = "PASSWORD";

    let passwordTextBox = document.createElement('input');
    passwordTextBox.setAttribute('id', 'password');
    passwordTextBox.setAttribute('class', 'inputField');
    passwordTextBox.setAttribute('type', 'password');
    passwordTextBox.setAttribute('autocomplete', 'off');

    let passwordToggleText = document.createElement('span');
    passwordToggleText.setAttribute('id', 'toggle-password');
    passwordToggleText.innerText = "Show";
    passwordToggleText.setAttribute('style', 'cursor:pointer; color: #000000;font-weight:bold;font-size:15px;font-family: Arial, sans-serif; position: absolute; right: 0; top: 50%; transform: translateY(-50%);');

    passwordToggleText.addEventListener('click', function () {
        if (passwordTextBox.type === "password") {
            passwordTextBox.type = "text";
            passwordToggleText.innerText = "Hide";
        } else {
            passwordTextBox.type = "password";
            passwordToggleText.innerText = "Show";
        }
    });

    passwordTextBox.addEventListener('focus', function () {
        this.classList.add('active');
        passwordLabel.classList.add('active');
    });
    passwordTextBox.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('active');
            passwordLabel.classList.remove('active');
        }
    });

    let passwordValidationDiv = document.createElement('div');
    passwordValidationDiv.setAttribute('style', 'color:#FA8072;height:20px;width:450px;font-size:10px;font-family: Arial, sans-serif;');

    let confirmPasswordDiv = document.createElement('div');
    confirmPasswordDiv.setAttribute('style', 'height:50px;width:450px;margin-top:10px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;');
    let confirmPasswordLabel = document.createElement('label');
    confirmPasswordLabel.innerText = "CONFIRM PASSWORD";

    let confirmPasswordTextBox = document.createElement('input');
    confirmPasswordTextBox.setAttribute('id', 'confirm-password');
    confirmPasswordTextBox.setAttribute('class', 'inputField');
    confirmPasswordTextBox.setAttribute('type', 'password');
    confirmPasswordTextBox.setAttribute('autocomplete', 'off');

    let confirmPasswordValidationDiv = document.createElement('div');
    confirmPasswordValidationDiv.setAttribute('style', 'color:#FA8072;height:20px;width:450px;font-size:10px;font-family: Arial, sans-serif;');

    let confirmPasswordToggleText = document.createElement('span');
    confirmPasswordToggleText.setAttribute('id', 'toggle-confirm-password');
    confirmPasswordToggleText.innerText = "Show";
    confirmPasswordToggleText.setAttribute('style', 'cursor:pointer;color: #000000;font-weight:bold;font-size:15px;font-family: Arial, sans-serif; position: absolute; right: 0; top: 50%; transform: translateY(-50%);');

    confirmPasswordToggleText.addEventListener('click', function () {
        if (confirmPasswordTextBox.type === "password") {
            confirmPasswordTextBox.type = "text";
            confirmPasswordToggleText.innerText = "Hide";
        } else {
            confirmPasswordTextBox.type = "password";
            confirmPasswordToggleText.innerText = "Show";
        }
    });

    confirmPasswordTextBox.addEventListener('focus', function () {
        this.classList.add('active');
        confirmPasswordLabel.classList.add('active');
    });
    confirmPasswordTextBox.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('active');
            confirmPasswordLabel.classList.remove('active');
        }
    });

    userTextBox.addEventListener('input', function () {
        const username = this.value;
        const usernameRegex = /^[A-Za-z]+$/;
        if (!usernameRegex.test(username)) {
            userTextBox.classList.add('error-border');
            userLabel.classList.add('error-label');
            userNameValidationDiv.innerHTML = "Username must contain only letters.";
        } else {
            userTextBox.classList.remove('error-border');
            userLabel.classList.remove('error-label');
            userNameValidationDiv.innerHTML = "";
        }
    });

    passwordTextBox.addEventListener('input', function () {
        const password = this.value;
        const passwordRegex = /^[A-Za-z0-9]{6}$/;
        if (!passwordRegex.test(password)) {
            passwordTextBox.classList.add('error-border');
            passwordLabel.classList.add('error-label');
            passwordValidationDiv.innerHTML = "Password must be exactly 6 alphanumeric characters.";
        } else {
            passwordTextBox.classList.remove('error-border');
            passwordLabel.classList.remove('error-label');
            passwordValidationDiv.innerHTML = "";
        }
    });

    confirmPasswordTextBox.addEventListener('input', function () {
        const confirmPassword = this.value;
        const password = document.getElementById('password').value;
        if (confirmPassword !== password) {
            confirmPasswordTextBox.classList.add('error-border');
            confirmPasswordLabel.classList.add('error-label');
            confirmPasswordValidationDiv.innerHTML = "Passwords do not match!";
        } else {
            confirmPasswordTextBox.classList.remove('error-border');
            confirmPasswordLabel.classList.remove('error-label');
            confirmPasswordValidationDiv.innerHTML = "";
        }
    });

    let signUpButtonDiv = document.createElement('div');
    signUpButtonDiv.setAttribute('style', 'height:40px;width:450px;margin-top:30px;display:flex;flex-direction:column;justify-content:center;align-items:center;');
    let signUpButton = document.createElement('input');
    signUpButton.setAttribute('type', 'submit');
    signUpButton.setAttribute('id', 'signUp-button');
    signUpButton.setAttribute('value', 'Sign Up');

    signUpButton.addEventListener('click', function () {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirm-password').value;
        let avatarUrl = `https://robohash.org/${username}.png?set=set4&size=200x200`;

        // Flag to track whether the form is valid
        let isValid = true;

        // Reset all previous error styles and messages before validation
        userTextBox.classList.remove('error-border');
        userLabel.classList.remove('error-label');
        userNameValidationDiv.innerHTML = "";

        passwordTextBox.classList.remove('error-border');
        passwordLabel.classList.remove('error-label');
        passwordValidationDiv.innerHTML = "";

        confirmPasswordTextBox.classList.remove('error-border');
        confirmPasswordLabel.classList.remove('error-label');
        confirmPasswordValidationDiv.innerHTML = "";

        // Username validation
        const usernameRegex = /^[A-Za-z]+$/;
        if (username === "") {
            userNameValidationDiv.innerHTML = "Username is required.";
            userTextBox.classList.add('error-border');
            userLabel.classList.add('error-label');
            isValid = false;
        } else if (!usernameRegex.test(username)) {
            userNameValidationDiv.innerHTML = "Username must contain only letters.";
            userTextBox.classList.add('error-border');
            userLabel.classList.add('error-label');
            isValid = false;
        }

        // Password validation
        const passwordRegex = /^[A-Za-z0-9]{6}$/;
        if (password === "") {
            passwordValidationDiv.innerHTML = "Password is required.";
            passwordTextBox.classList.add('error-border');
            passwordLabel.classList.add('error-label');
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            passwordValidationDiv.innerHTML = "Password must be exactly 6 alphanumeric characters.";
            passwordTextBox.classList.add('error-border');
            passwordLabel.classList.add('error-label');
            isValid = false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            confirmPasswordValidationDiv.innerHTML = "Passwords do not match!";
            confirmPasswordTextBox.classList.add('error-border');
            confirmPasswordLabel.classList.add('error-label');
            isValid = false;
        }

        // Check for username uniqueness
        if (allUsers.some(user => user.username === username)) {
            userNameValidationDiv.innerHTML = "Username already exists. Please choose a different one.";
            userTextBox.classList.add('error-border');
            userLabel.classList.add('error-label');
            isValid = false;
        }

        // If the form is invalid, stop here and don't proceed with the sign-up process
        if (!isValid) return;

        // Proceed with user creation if all validations pass
        let newUser = {
            username: username,
            password: password,
            avatar: avatarUrl
        };

        allUsers.push(newUser);

        localStorage.setItem('allUsers', JSON.stringify(allUsers));

        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        smallLoader(signIn); // Proceed with the sign-in or further actions
    });


    let signInToggleDiv = document.createElement('div');
    signInToggleDiv.setAttribute('style', 'height:30px;width:450px;margin-top:30px;display:flex;flex-direction:column;justify-content:center;align-items:center;');
    let signInToggle = document.createElement('p');
    signInToggle.innerHTML = `Already have an account? <span id="spanIdSignIn">Sign In</span>`;

    const signInSpan = signInToggle.querySelector('span');
    signInSpan.addEventListener('click', function () {
        localStorage.setItem('pageState', 'signIn');
        signIn();
    });

    // Adding Children
    logoDiv.appendChild(logo);
    loginContainer.appendChild(logoDiv);

    welcomeLabel.appendChild(welcome);
    loginContainer.appendChild(welcomeLabel);

    userDiv.appendChild(userLabel);
    userDiv.appendChild(userTextBox);
    loginContainer.appendChild(userDiv);

    loginContainer.appendChild(userNameValidationDiv);

    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordTextBox);
    passwordDiv.appendChild(passwordToggleText);
    loginContainer.appendChild(passwordDiv);

    loginContainer.appendChild(passwordValidationDiv);

    confirmPasswordDiv.appendChild(confirmPasswordLabel);
    confirmPasswordDiv.appendChild(confirmPasswordTextBox);
    confirmPasswordDiv.appendChild(confirmPasswordToggleText);
    loginContainer.appendChild(confirmPasswordDiv);

    loginContainer.appendChild(confirmPasswordValidationDiv);

    loginContainer.appendChild(signUpButtonDiv);
    signUpButtonDiv.appendChild(signUpButton);

    signInToggleDiv.appendChild(signInToggle);
    loginContainer.appendChild(signInToggleDiv);

    AnimationDiv.appendChild(signUpAnimation);
    mainDiv.appendChild(loginContainer);
    mainDiv.appendChild(AnimationDiv);
}

// Main Feed Function
function mainFeed() {
    let mainFeedStyle = document.createElement('style');
    mainFeedStyle.innerHTML=`
        .settings-div:hover{
            background-color:#F0F0F0;
            box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
            transition:ease-out;
        }
    `;
    document.head.appendChild(mainFeedStyle);

    let mainDiv = document.getElementById('mainDiv');
    mainDiv.innerHTML = '';
    mainDiv.setAttribute('style','display:flex;width:100%;height:100%;justify-content:flex-start;align-items:flex-start;');

    let settingsContainer=document.createElement('div');
    settingsContainer.setAttribute('style','display: flex; flex-direction: column; justify-content: flex-start; align-items:center;height:100%;width:20%;border-right:0.5px solid lightgrey');

    let logoDiv=document.createElement('div');
    logoDiv.setAttribute('style','display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:130px;');

    let logoImage=document.createElement('img');
    logoImage.setAttribute('src','images/ifify_logo.png');
    logoImage.setAttribute('style','width:120px;height:auto;');

    let logoText=document.createElement('span');
    logoText.innerText="Where Curiosity Meets Conversation";
    logoText.setAttribute('style','color:#9B94B7; font-family: "Brush Script MT", cursive; font-size:25px;font-size:20px;margin-top:0px');

    let profileContainerDiv = document.createElement('div');
    profileContainerDiv.setAttribute('style','margin-bottom:20px;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:150px;');
    
    // Retrieve the current user from localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // Create a profile section for the logged-in user
        let profileContainer = document.createElement('div');
        profileContainer.setAttribute('id','profile');
        profileContainer.setAttribute('class','settings-div');
        profileContainer.setAttribute('style', 'cursor:pointer;display: flex; flex-direction: column; align-items: center; padding: 20px; border-radius: 10px; width: 82%;height:100px; text-align: center; transition: width 1s;');

        // Avatar image or color-based avatar
        let avatarImg = document.createElement('img');
        avatarImg.setAttribute('src', currentUser.avatar);  // Retrieve the avatar URL
        avatarImg.setAttribute('style', 'width: 80px; height: 100px; border-radius: 50%; margin-bottom: 10px;border:1px solid black;border-radius:50%;');
        
        // Username
        let usernameLabel = document.createElement('h3');
        usernameLabel.innerText = currentUser.username;
        usernameLabel.setAttribute('style', 'font-size: 1.5rem; color: #333; margin: 0;');
        
        // Append the avatar and username to the profile container
        profileContainer.appendChild(avatarImg);
        profileContainer.appendChild(usernameLabel);
        
        profileContainerDiv.appendChild(profileContainer);
    } else {
        // If no user is logged in, show a generic welcome message
        feedContainer.innerText = "Welcome to the main feed! Please sign up or log in to see your profile.";
    }
    
    let feedContainer = document.createElement('div');
    feedContainer.setAttribute('style', 'display: flex; flex-direction: column; justify-content: center; align-items: center; width:80%;height:100%; font-size: 2rem;');
    
    let searchDiv=document.createElement('div');
    searchDiv.setAttribute('class','settings-div');
    searchDiv.setAttribute('style','margin-top:20px;display:flex;justify-content:flex-start;align-items:center;width:95%;height:50px;border-radius:10px;cursor:pointer;')

    let searchImage=document.createElement('img');
    searchImage.setAttribute('src','https://icons.iconarchive.com/icons/amitjakhu/drip/128/search-icon.png');
    searchImage.setAttribute('style','display:flex;margin-left:30px;width:35px;height:35px;');

    let search = document.createElement('span');
    search.innerHTML="Search";
    search.setAttribute('id', 'search');
    search.setAttribute('style','display:flex;margin-left:20px;font-size:25px;')
    searchDiv.addEventListener('click', function () {

    });

    let messageDiv=document.createElement('div');
    messageDiv.setAttribute('class','settings-div');
    messageDiv.setAttribute('style','margin-top:20px;display:flex;justify-content:flex-start;align-items:center;width:95%;height:50px;border-radius:10px;cursor:pointer;')

    let messageImage=document.createElement('img');
    messageImage.setAttribute('src','https://icons.iconarchive.com/icons/pictogrammers/material/128/message-processing-outline-icon.png');
    messageImage.setAttribute('style','display:flex;margin-left:30px;width:35px;height:35px;');

    let message = document.createElement('span');
    message.innerHTML="Messages";
    message.setAttribute('id', 'search');
    message.setAttribute('style','display:flex;margin-left:20px;text-decoration:line-through;font-size:25px;')
    messageDiv.addEventListener('click', function () {

    });

    let postDiv=document.createElement('div');
    postDiv.setAttribute('class','settings-div');
    postDiv.setAttribute('style','margin-top:20px;display:flex;justify-content:flex-start;align-items:center;width:95%;height:50px;border-radius:10px;cursor:pointer;')

    let postImage=document.createElement('img');
    postImage.setAttribute('src','https://icons.iconarchive.com/icons/pictogrammers/material/128/plus-box-outline-icon.png ');
    postImage.setAttribute('style','display:flex;margin-left:30px;width:35px;height:35px;');

    let post = document.createElement('span');
    post.innerHTML="Post";
    post.setAttribute('id', 'search');
    post.setAttribute('style','display:flex;margin-left:20px;font-size:25px;')
    postDiv.addEventListener('click', function () {

    });

    let logOutDiv = document.createElement('div');
    logOutDiv.setAttribute('class','settings-div');
    logOutDiv.setAttribute('style','margin-top:20px;display:flex;justify-content:flex-start;align-items:center;width:95%;height:50px;border-radius:10px;cursor:pointer;')
    
    let logoutImage=document.createElement('img');
    logoutImage.setAttribute('src','https://icons.iconarchive.com/icons/pictogrammers/material/128/logout-icon.png');
    logoutImage.setAttribute('style','display:flex;margin-left:30px;width:35px;height:35px;');

    let logOut = document.createElement('span');
    logOut.innerHTML="Logout";
    logOut.setAttribute('id', 'log-out');
    logOut.setAttribute('style','display:flex;margin-left:20px;font-size:25px;')
    logOutDiv.addEventListener('click', function () {
        logout();
    });

    let settingDiv=document.createElement('div');
    settingDiv.setAttribute('class','settings-div');
    settingDiv.setAttribute('style','margin-top:20px;display:flex;justify-content:flex-start;align-items:center;width:95%;height:50px;border-radius:10px;cursor:pointer;')

    let settingImage=document.createElement('img');
    settingImage.setAttribute('src','https://icons.iconarchive.com/icons/picol/picol/128/Settings-icon.png');
    settingImage.setAttribute('style','display:flex;margin-left:30px;width:35px;height:35px;');

    let setting = document.createElement('span');
    setting.innerHTML="Settings";
    setting.setAttribute('id', 'setting');
    setting.setAttribute('style','display:flex;margin-left:20px;font-size:25px;')
    settingDiv.addEventListener('click', function () {

    });
    
    logoDiv.appendChild(logoImage);
    logoDiv.appendChild(logoText);
    settingsContainer.appendChild(logoDiv);

    settingsContainer.appendChild(profileContainerDiv);

    searchDiv.appendChild(searchImage);
    searchDiv.appendChild(search);
    settingsContainer.appendChild(searchDiv);

    messageDiv.appendChild(messageImage);
    messageDiv.appendChild(message);
    settingsContainer.appendChild(messageDiv);
    
    postDiv.appendChild(postImage);
    postDiv.appendChild(post);
    settingsContainer.appendChild(postDiv);

    settingDiv.appendChild(settingImage);
    settingDiv.appendChild(setting);
    settingsContainer.appendChild(settingDiv);
    
    logOutDiv.appendChild(logoutImage);
    logOutDiv.appendChild(logOut);
    settingsContainer.appendChild(logOutDiv);

    mainDiv.appendChild(settingsContainer);
    mainDiv.appendChild(feedContainer);
    localStorage.setItem('pageState', 'mainFeed');
}

//small-loader function
function smallLoader(callback) {
    let loaderStyle = document.createElement('style');
    loaderStyle.innerHTML = `
    #small-loader-logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        }
        #small-loader-image {
            width: 150px;
            height: auto;
        }
    `;
    document.head.appendChild(loaderStyle);

    let mainDiv = document.getElementById('mainDiv');
    mainDiv.innerHTML = '';

    const AnimationDiv = document.createElement('div');
    AnimationDiv.id = 'small-loader-logo';

    const loaderImage = document.createElement('img');
    loaderImage.id = 'small-loader-image';
    loaderImage.setAttribute('src', 'images/ifify_logo.png');
    loaderImage.setAttribute('alt', 'Ifify Logo');

    AnimationDiv.appendChild(loaderImage);

    document.body.appendChild(AnimationDiv);

    setTimeout(() => {
        AnimationDiv.style.display = 'none';

        if (typeof callback === 'function') {
            callback();
        }
    }, 600);
}

//logout function
function logout() {
    localStorage.removeItem('pageState');
    let mainDiv = document.getElementById('mainDiv');
    mainDiv.innerHTML = '';
    smallLoader(signIn);
}