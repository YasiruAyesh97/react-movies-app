import React,{Component} from 'react';
import Joi from 'joi-browser';
import Input from "../common/input";
import Form from "../common/form";
import {login} from '../services/userService';

class LoginForm extends Form {
    state={
        data:{
            username:'',
            password:''
        },
        errors:{}
    }
    schema ={
        username: Joi.string().required(),
        password: Joi.string().required()
    }




    // validate =()=>{
    //    const result = Joi.validate(this.state.data,this.schema,{abortEarly:false});
    //     console.log(result);
    //    if(!result.error) return null;
    //   const errors ={};
    //   for (let item of result.error.details)
    //        errors[item.path[0]] =item.message;
    //
    //    return errors;
    // }
    // validateProperty =({name,value})=>{
    //     const obj ={[name] : value};
    //     const schema ={[name]:this.schema[name]};
    //     const {error} = Joi.validate(obj,schema);
    //     return error ? error.details[0].message :null;
    //
    // }
    //
    // handleSubmit =e => {
    //     e.preventDefault();
    //     const errors =this.validate();
    //     //console.log("errors :"+errors);
    //     this.setState({errors : errors || {} });
    //     if(errors) return;
    //     this.doSubmit();
    //
    //
    // }
    doSubmit=async ()=>{
        const {data} =this.state;
        try{
            //pick the data property from promise (return json web token )

            await login(data.username,data.password);
            console.log("submitted");

            //navigate the user for defferant adderess
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



    // handleChange =({currentTarget:input}) =>{
    //     //e.currentTarget
    //     const errors ={...this.state.errors}
    //     const errorMessage =this.validateProperty(input);
    //     if(errorMessage) errors[input.name] =errorMessage;
    //     else delete errors[input.name];
    //
    //     const data = {...this.state.data};
    //     data[input.name] =input.value;
    //     this.setState({data,errors});
    //
    // }
    render() {
      return(
          <div className="container">
              <h1>Login</h1>
              <form onSubmit={this.handleSubmit}>

                  {this.renderInput('email','username','Email address')}
                  {this.renderInput('password','password','Password')}

                  {/*<Input*/}
                  {/*    label="Email address"*/}
                  {/*    type="email"*/}
                  {/*    id="username"*/}
                  {/*    name="username"*/}
                  {/*    placeholder="Enter email"*/}
                  {/*    onChange={this.handleChange}*/}
                  {/*    value={this.state.data.username}*/}
                  {/*    error ={this.state.errors.username}*/}

                  {/*/>*/}

                  {/*<Input*/}
                  {/*    label="Password"*/}
                  {/*    type="password"*/}
                  {/*    id="password"*/}
                  {/*    name="password"*/}
                  {/*    placeholder="Password"*/}
                  {/*    onChange={this.handleChange}*/}
                  {/*    value={this.state.data.password}*/}
                  {/*    error ={this.state.errors.password}*/}

                  {/*/>*/}



                  {/*<div className="form-group">*/}
                  {/*    <label htmlFor="exampleInputEmail1">Email address</label>*/}
                  {/*    <input*/}
                  {/*        type="email"*/}
                  {/*        className="form-control"*/}
                  {/*        id="username"*/}
                  {/*        name="username"*/}
                  {/*        placeholder="Enter email"*/}
                  {/*        onChange={this.handleChange}*/}
                  {/*        value={this.state.account.username}*/}
                  {/*    />*/}
                  {/*</div>*/}
                  {/*<div className="form-group">*/}
                  {/*    <label htmlFor="exampleInputPassword1">Password</label>*/}
                  {/*    <input*/}
                  {/*        type="password"*/}
                  {/*        onChange={this.handleChange}*/}
                  {/*        value={this.state.account.password}*/}
                  {/*        name="password"*/}
                  {/*        className="form-control"*/}
                  {/*        id="exampleInputPassword1"*/}
                  {/*        placeholder="Password"*/}
                  {/*    />*/}
                  {/*</div>*/}
                  {/*<div className="form-check">*/}
                  {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>*/}
                  {/*        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                  {/*</div>*/}
                  {/*<button disabled={this.validate()} type="submit" className="btn btn-primary">Submit</button>*/}

                  {this.renderButton("Log in")}
              </form>
          </div>
      );

    }
}
export default  LoginForm;