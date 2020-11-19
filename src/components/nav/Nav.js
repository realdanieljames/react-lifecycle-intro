import React, { Component } from 'react'
import { Link } from "react-router-dom"; 
import jwtDecode from "jwt-decode";


export default class Nav extends Component {

    // state = {
    //     isAuth: false,
    //     user: null,
    // };

    // componentDidMount(){
    //     let token = localStorage.getItem("jwtToken")

    //     if(token !== null){        
        
    //         let decoded =  jwtDecode(token);
    //         let currentTime = Date.now()/1000;
        
    //         if(decoded.exp < currentTime){
    //             localStorage.removeItem("jwtToken")
    //         } else {
    //             this.setState({
    //                 isAuth: true,
    //                 user: {
    //                     email: decoded.email,
    //                     _id: decoded._id
    //                 },
    //             });
    //         }
    // }
    // }

    // componentDidUpdate(prevState, prevProps){
    //     // console.log("prevState", prevState)
    //     // console.log("prevProps", prevProps)
    //     if(this.props.user !== prevState.user &&
    //         this.props.isAuth !== prevState.isAuth){
    //             console.log(this)
    //             this.setState({
    //                 isAuth: this.props.isAuth,
    //                 user:{
    //                     email: this.props.user.email,
    //                     _id: this.props.user._id,
    //                 },
    //             });
    //         }
    // }

    

    logout = () => {
        localStorage.removeItem("jwtToken");
        this.props.logout();
    };

    render() {
        let nav
        // const{isAuth, user}= this.props

        if (this.props.isAuth && this.props.user !== null) {
            nav = (
                <div>
                    <ul style={{listStyle: "none"}}>
                        <li
                        style ={{
                            display: "inline",
                            marginRight: 20,
                        }}>
                            <Link to="/profile" style={{ textDecoration: "none"}}>
                                {this.props.user.email}
                            </Link>
                        </li>
                        <li  style={{display: "inline"}}>
                            <Link
                            to="/logout"
                            onClick={this.logout}
                            style={{ textDecoration: "none"}}
                            >
                                logout
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        } else {
            nav = (
                <div>
                <ul style={{ listStyle: "none"}}>
                    <li style={{display: "inline", marginRight: 20}}>
                        <Link to="/sign-in">Sign in</Link>
                    </li>

                    <li style={{display: "inline"}}>
                        <Link to="/sign-up" style={{textDecoration: "none"}}>Register</Link>
                    </li>
                </ul>
                
            </div>
            );
        }

        return <> {nav}</>
        
    }
}
