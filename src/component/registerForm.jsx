import React,{Component} from 'react';
import Joi from 'joi-browser';
import Input from "../common/input";
import Form from "../common/form";
import * as userService from "../services/userService";
import {loginWithJwt} from "../services/userService";

class RegisterForm extends Form {
    state={
        data:{
            username:'',
            password:'',
            name:'',
        },
        errors:{}
    }
    schema ={
        username: Joi.string()
            .required()
            .email(),

        password: Joi.string()
            .required()
            .min(5),
        name:Joi.string()
            .required(),
    }


    doSubmit= async ()=>{
         try{
             const response = await userService.register(this.state.data);
             // console.log(response);
         // response
             // config: {url: "http://localhost:4000/user/", method: "post", data: "{"email":"yashiruayashmantha@gmail.com","password":"12345","name":"Top Ten"}", headers: {…}, transformRequest: Array(1), …}
             // data: {name: "Top Ten", email: "yashiruayashmantha@gmail.com", password: "$2b$10$Kfoz0SNs95IZcQIX8fZ0hOUPiFUBft0lEARUiIeSKqjDE6LW7qKWq"}
             // headers: {content-length: "131", content-type: "application/json; charset=utf-8", x-.auth-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…yNTJ9.aJ6yYRqc0xmrdnGhzOfDUDuHj3irkM3N2DmIgNCJpv8"}
             // request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
             // status: 200
             // statusText: "OK"
             loginWithJwt(response.headers['x-auth-token']);
             // this.props.history.push('/');
             window.location='/';

         }catch (e) {
             if(e.response && e.response.status===400){
                 const errors ={...this.state.errors};
                 errors.username=e.response.data;
                 this.setState({errors});
             }
         }

    }


    render() {
      return(
          <div className="container">
              <h1>RegisterForm</h1>
              <form onSubmit={this.handleSubmit}>

                  {this.renderInput('email','username','Email address')}
                  {this.renderInput('password','password','Password')}
                  {this.renderInput('text','name','name')}


                  {this.renderButton("Register")}
              </form>
          </div>
      );

    }
}
export default  RegisterForm;