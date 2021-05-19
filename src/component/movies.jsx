import React,{Component} from "react";
// import {getMovies} from '../services/fakeMovieService'
import {getMovies,deleteMovie} from '../services/MovieService';

import Pagination from '../common/pagination'
import ListGroup from '../common/listGroup';
import SearchBox from '../common/searchBox';
//name exports
import {paginate } from "../utils/paginate";
//import {getGenres} from '../services/fakeGenreService';
import {getGenres} from '../services/GenreService';
import MoviesTable from '../component/moviesTable';
import _ from 'lodash';
import { Link } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";



class Movies extends Component {
    state={
        movies:[],
        genres :[],
        pageSize:4,
        currentPage:1,
        selectedGenre: null,
        sortColumn: {path :'title', order:'asc' },
        searchQuery: ""
    };

    async componentDidMount() {

        const {data :genre} =await getGenres();
        const {data :movies} =await getMovies();

        this.setState({
           movies:movies,
           genres:[{_id:'',name:'all Genres'},...genre],
        })
    }

    handleDelete =async (movie)=>{

        const originalMovie=this.state.movies;
        const movies =originalMovie.filter(m =>m._id !== movie._id);
        this.setState({movies:movies});

        try{

            await deleteMovie(movie._id);
        }catch(ex){
            //404 from node backend
            //The movie with the given ID was not found
            if(ex.response && ex.response.status===404){
                toast.error('This movie has already been deleted');


            }

        }
    };

    // handleUpdate = (movie) => <Link to={`/movies/new/${movie._id}`}/>;


    handlePageChange =(page)=>{
        console.log(page);
        this.setState({currentPage:page});

    };
    handleGenreSelect =(genre)=>{
        console.log(genre)
        this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
    };

    handleSort =(sortColumn)=>{
        // console.log('handle sort'+path);
        // // this.setState({sortColumn:{path,order:'asc'}});
        // //cloning sortColumn object
        // const sortColumn ={...this.state.sortColumn};
        //
        //
        // if(sortColumn.path ===path)
        //     sortColumn.order =(sortColumn.order ==='asc') ?'desc':'asc';
        // else{
        //     sortColumn.path =path;
        //     sortColumn.order ='asc';
        // }

        this.setState({sortColumn});
    }


    handleSearchChange = query => {

        //query =event.currentTarget.value  ->user type in the input field
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    getPagedData = () => {
        const {
            currentPage,
            pageSize,
            movies: allMovies,
            selectedGenre,
            sortColumn,
            searchQuery
        } = this.state;

        let filtered =allMovies;
        if(searchQuery){
            filtered =allMovies.filter(m =>m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));
        }else if(selectedGenre && selectedGenre._id){
            filtered = allMovies.filter(m =>m.genre._id === selectedGenre._id);
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    }


        render(){
        // //object destructuring
        // const {length :count} = this.state.movies;
        // const {pageSize,currentPage,genres,selectedGenre,searchQuery,sortColumn,  movies:allMovies}=this.state;
        // if(count===0){
        //     return (<p>Showing {} movies in the database.</p>);
        // }
        // const filtered = selectedGenre &&selectedGenre._id ? allMovies.filter(m =>m.genre._id === selectedGenre._id) :allMovies;
        // const sorted =_.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        // const movies =paginate(sorted,currentPage,pageSize);


            let { length: count } = this.state.movies;
            let { genres,currentPage, pageSize, sortColumn, searchQuery } = this.state;
            let { user } = this.props;
            // console.log('user2 :::'+user);
            // if (moviesCount === 0) return <h5>There are no movies in the database</h5>;

            const { totalCount, data: movies } = this.getPagedData();


        return (
        <React.Fragment>
            <ToastContainer/>
            <div className="container  mt-5">
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            items={genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={ this.handleGenreSelect}


                        />
                    </div>
                    <div className="col">

                        {user &&(
                            <Link
                                to="/movies/new"
                                className="btn btn-primary"
                                style={{marginBottom :20}}
                            >

                                New Movie
                            </Link>
                        )

                        }

                        {/*<p>Showing {filtered.length} movies in the database.</p>*/}
                        <p>Showing {totalCount} movies in the database.</p>

                        <SearchBox value={searchQuery} onChange={this.handleSearchChange}/>

                        <MoviesTable
                            movies ={movies}
                            sortColumn={sortColumn}
                            onDelete ={this.handleDelete}
                            // onUpdate ={this.handleUpdate}
                            onSort={this.handleSort}

                        />
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}


                        />
                    </div>
                </div>
            </div>


        </React.Fragment>
        );
    }
}

export default Movies;