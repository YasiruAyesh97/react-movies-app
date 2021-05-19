import React,{Component} from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Form extends Component {
    state={
        data:{},
        errors:{},
    };

    //details: Array(2)
    // 0:
    // context: {value: "", invalids: Array(1), key: "username", label: "username"}
    // message: "\"username\" is not allowed to be empty"
    // path: ["username"]
    //1:
    // context: {value: "", invalids: Array(1), key: "password", label: "password"}
    // message: "\"password\" is not allowed to be empty"
    // path: ["password"]

    validate =()=>{
        const result = Joi.validate(this.state.data,this.schema,{abortEarly:false});
        console.log(result);
        if(!result.error) return null;
        const errors ={};
        for (let item of result.error.details)
            errors[item.path[0]] =item.message;

        return errors;
    }
    validateProperty =({name,value})=>{
        const obj ={[name] : value};
        const schema ={[name]:this.schema[name]};
        const {error} = Joi.validate(obj,schema);
        return error ? error.details[0].message :null;

    }
    handleSubmit =e => {
        e.preventDefault();
        const errors =this.validate();
        //console.log("errors :"+errors);
        this.setState({errors : errors || {} });
        if(errors) return;
        this.doSubmit();
    }

    handleChange =({currentTarget:input}) =>{
        //e.currentTarget
        const errors ={...this.state.errors}
        const errorMessage =this.validateProperty(input);
        if(errorMessage) errors[input.name] =errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] =input.value;
        this.setState({data,errors});

    }

    renderButton(label) {
        return <button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>;

    }
    renderInput(type,name,label) {
        return (
            <Input
                label={label}
                type={type}
                id={name}
                name={name}
                placeholder={name}
                onChange={this.handleChange}
                value={this.state.data[name]}
                error ={this.state.errors[name]}

            />
        );
    }
    renderSelect(name,label,options){
        return(
            <Select
            name={name}
            value={this.state.data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={this.state.errors[name]}
            />
        )
    }

}
export default Form;