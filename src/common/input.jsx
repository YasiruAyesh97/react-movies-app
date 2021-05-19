import React from 'react';

const Input =({type,id,name,placeholder,label,value,error,onChange}) =>{
    return(
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">{label}</label>
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
export default Input;