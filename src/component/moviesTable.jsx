import React,{Component} from 'react'
import Table from "../common/table";
import {Link} from "react-router-dom";
import {getCurrentUser} from "../services/userService";

class MoviesTable extends Component{





    columns =[
        {path: 'title' ,label:'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name' ,label:'Genre'},
        {path: 'numberInStock' ,label:'Stock'},
        {path: 'dailyRentalRate' ,label:'Rate'}

        // {key:'update',content :movie =>(
        //         <button
        //             onClick={()=>this.props.onUpdate(movie)}
        //             className="btn btn-warning btn-sm "
        //         >
        //             Update
        //         </button>
        //     )
        // },


    ];

    constructor() {
        super();
         const user= getCurrentUser();
        // alert(user.isAdmin);
        if(user && user.isAdmin){

            this.columns.push({
                key:'delete',
                content :movie =>(
                    <button
                        onClick={()=>this.props.onDelete(movie)}
                        className="btn btn-danger btn-sm "
                    >
                        Delete
                    </button>


                )
            });
        }else{

        }
    }
    render() {

        const{movies,onDelete,onSort,sortColumn} =this.props;

        return (<Table
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}





            />

        );
    }
}


export default MoviesTable;