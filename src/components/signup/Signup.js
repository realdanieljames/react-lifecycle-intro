import React, { Component } from "react";
import validator from "validator";
import axios from "axios";
import jwtDecode from "jwt-decode"

import Todo from "../Todo/Todo";
// import Message from "./components/shared/Message";

//============================================================================================================//
//============================================================================================================//
class Signup extends Component {
state = {
    isAuth: false,
    email: "",
    password: "",
    errorMessage: "",
    isError: false,
    isPasswordError: true,
    isPasswordErrorMessage: "",
    isSubmitError: false,
    submitErrorMessage: "",
    successMessage: false,
    isSuccessMessage: "",
};

componentDidMount(){
    let token = localStorage.getItem("jwtToken")

    if(token !== null){        
    
        let decoded =  jwtDecode(token);
        let currentTime = Date.now()/1000;
    
        if(decoded.exp < currentTime){
            localStorage.removeItem("jwtToken");
            this.props.history.push("/")
        } else {
            this.props.history.push("/todo")
        }
}
}

//============================================================================================================//
//============================================================================================================//
handleOnChangeEmail = async (event) => {
    this.setState(
    {
        [event.target.name]: event.target.value,
    },
    () => {
        const { email } = this.state;

        let isEmail = validator.isEmail(email);

        if (isEmail) {
        } else {
        this.setState({
            isError: true,
            errorMessage: `Please Enter a Correct Email`,
        });
        }
    }
    );
};

//============================================================================================================//
//============================================================================================================//
handleOnChangePassword = async (event) => {
    this.setState(
    {
        [event.target.name]: event.target.value,
    },
    () => {
        const { password } = this.state;

        let isPassword = validator.matches(
        password,
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        );

        if (isPassword) {
        this.setState({
            isPasswordError: false,
            isPasswordErrorMessage: "",
        });
        } else {
        this.setState({
            isPasswordError: true,
            isPasswordErrorMessage: `
        Password must contain:
        - A minimum of 8 characters
        - 1 Uppercase Letter,  
        - 1 Lowercase Letter,
        - 1 Number,  
        - and 1 of these special characters " #?!@$%^&*_ "`,
        });
        }
    }
    );
};

//============================================================================================================//
//============================================================================================================//
handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if (validator.isEmpty(email) && validator.isEmpty(password)) {
    this.setState({
        isSubmitError: true,
        submitErrorMessage: " Cannot have empty Email and Password",
    });
    return;
    } else {
    this.setState({
        isSubmitError: false,
        submitErrorMessage: "",
    });
    }

    if (validator.isEmpty(email)) {
    this.setState({
        isSubmitError: true,
        submitErrorMessage: "Cannot have empty email",
    });
    } else {
    this.setState({
        isSubmitError: false,
        submitErrorMessage: "",
    });
    }

    if (validator.isEmpty(password)) {
    this.setState({
        isSubmitError: true,
        submitErrorMessage: "Cannot have empty password",
    });
    } else {
    this.setState({
        isSubmitError: false,
        submitErrorMessage: "",
    });
    }

    try {
    let success = await axios.post(
        "http://localhost:3003/api/users/create-user",
        {
        email: email,
        password: password,
        }
    );
    console.log(success)
    this.setState({
        isSuccessMessage: true,
        successMessage: success.data.message,
    });
    console.log("success");
    } catch (e) {
    if (e && e.response.status === 409) {
        this.setState({
        isError: true,
        errorMessage: e.response.data.message,
        });
    }
    }
};

//============================================================================================================//
//============================================================================================================//
// handleSignUpConfirmation = async

//============================================================================================================//
//============================================================================================================//

render() {
    const {
    isAuth,
    errorMessage,
    isError,
    isPasswordError,
    isPasswordErrorMessage,
    isSubmitError,
    submitErrorMessage,
    isSuccessMessage,
    successMessage,
    } = this.state;

    let showTodoComponent = isAuth ? (
    <Todo />
    ) : (
    <form
        onSubmit={this.handleOnSubmit}
        
    >
        <h2>Sign Up</h2>
        {" "}
        {isError ? <div>{errorMessage}</div> : ""}
        {isSubmitError ? <div>{submitErrorMessage}</div> : ""}
        {isSuccessMessage ? <div>{successMessage}</div> : ""}
        <input
        type="text"
        placeholder="enter email"
        name="email"
        onChange={this.handleOnChangeEmail}
        value={this.state.email}
        />{" "}
        <br />
        {isPasswordError ? <div>{isPasswordErrorMessage}</div> : ""}
        <input
        type="text"
        placeholder="enter password"
        name="password"
        onChange={this.handleOnChangePassword}
        value={this.state.password}
        />{" "}
        <br /> <button>Sign up</button>
    </form>
    );

    return (
    <div style={{ textAlign: "center", marginTop: "15%" }}>
        {showTodoComponent}
    </div>
    );
}
}
//============================================================================================================//
//============================================================================================================//

export default Signup;
