import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';

 // import {getGenres} from '../services/fakeGenreService';
 import {saveMovie,getMovie} from "../services/MovieService";
 import {getGenres} from '../services/GenreService';
import {toast} from "react-toastify";

class MovieForm  extends Form {
    state={
        data:{
            title:"",
            genreId:"",
            numberInStock:"",
            dailyRentalRate:"",
        },
        genres:[],
        errors:{}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(1)
            .max(10)
    };

       async componentDidMount(){

        const {data :genres} =await getGenres();
        this.setState({genres});

        const movieId =this.props.match.params.id;
        if(movieId ==="new") return;

        const {data :movie}  =await getMovie(movieId);

        if(!movie) return this.props.history.replace('/not-found');
        this.setState({data:this.mapToViewModel(movie)})
    }
    mapToViewModel = movie => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };
    doSubmit= async ()=>{
      try{
          await saveMovie(this.state.data);
          alert("successful");
          this.props.history.push("/movies");
      }catch (ex) {
          if(ex.response && ex.response.status===400){
              toast.error('This movie has not validate data');


          }
      }

    }

    render(){
        return(
            <div className="container">
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>

                    {this.renderInput('text','title','Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('text','numberInStock','number In Stock')}
                    {this.renderInput('text','dailyRentalRate','daily Rental Rate')}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }

}



export default MovieForm ;
