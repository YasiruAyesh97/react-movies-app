import http from "./httpService";

export function getGenres() {
 return  http.post('http://localhost:4000/genre');
}