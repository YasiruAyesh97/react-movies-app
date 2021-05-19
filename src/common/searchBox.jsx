import React, { Component } from "react";

const  SearchBox =({value,onChange}) => {

    return (
            <input

                style={{ marginBottom: 20 }}
                type="text"
                name="query"
                placeholder="Search..."
                className="form-control my-3"
                value={value}
                onChange={e =>onChange(e.currentTarget.value)}
            />
        );
}
export default SearchBox;