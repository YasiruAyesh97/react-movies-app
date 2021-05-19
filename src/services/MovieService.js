import http from "./httpService";

export function saveMovie(movie){
    if(movie._id){
        const body ={...movie};
        delete body._id;
      return  http.put('http://localhost:4000/movies'+'/'+movie._id,body);
    }
    return  http.post('http://localhost:4000/movies/new',movie);
}

export function getMovies(){
    return  http.get('http://localhost:4000/movies/');
}
export function getMovie(id){
    return  http.get('http://localhost:4000/movies'+'/'+id);
}
export function deleteMovie(id){
    return  http.delete('http://localhost:4000/movies'+'/'+id);
}