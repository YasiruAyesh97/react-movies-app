import http from "./httpService";
import jwtDecode from "jwt-decode";

export function register(user){

    return  http.post('http://localhost:4000/user/',{
        email: user.username,
        password:user.password,
        name:user.name
    });
}

export async function login(email,password){
    const {data:jwt} =await http.post('http://localhost:4000/auth/',{email,password});
    localStorage.setItem('token',jwt);
}
export function logout(){
    localStorage.removeItem('token');
}
export function getCurrentUser(){

        const jwt =localStorage.getItem('token');
        if(jwt) return jwtDecode(jwt);
        return false;



}
export function loginWithJwt(jwt){
    localStorage.setItem('token',jwt);
}
export function getJwt(){
    return localStorage.getItem('token');
}