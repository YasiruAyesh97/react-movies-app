
import './App.css';
import Movies from './component/movies';
import Customers from "./component/customer";
import {Route,Switch,Redirect} from 'react-router-dom';
import Rentals from "./component/rentals";

import {ToastContainer} from 'react-toastify';
import NotFound from "./component/notFound";
import React,{Component} from "react";
import NavBar from "./component/navbar";
import MovieForm from "./component/movieForm";
import loginForm from "./component/loginForm";
import Logout from "./component/logout";
 import ProtectedRoute from "./component/protectedRoute";

import registerForm from "./component/registerForm";
import http from "./services/httpService";
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";
import {getCurrentUser} from "./services/userService";

class App extends Component{
    state={};
    componentDidMount() {
        try{
            // const jwt =localStorage.getItem('token');
            // const user = jwtDecode(jwt);
            const user =getCurrentUser();

            this.setState({user});

        }catch (e) {

        }

    }

    render(){
        return (

            <React.Fragment>
                <ToastContainer/>
                <NavBar user={this.state.user}/>
                <main className="content">
                    <Switch>
                        <Route path="/login" component={loginForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={registerForm}/>

                        <ProtectedRoute
                            path="/movies/:id"
                            component={MovieForm}
                        />

                         <Route
                             path="/movies"
                             render={props => <Movies {...props} user={this.state.user} />}

                         />
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>

                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>


                {/*<div className="container">*/}
                {/*  <Movies/>*/}
                {/*</div>*/}
            </React.Fragment>
        );
    }
}

// function App() {
//
//     return (
//
//         <React.Fragment>
//             <ToastContainer/>
//             <NavBar/>
//             <main className="content">
//                 <Switch>
//                     <Route path="/login" component={loginForm}/>
//                     <Route path="/register" component={registerForm}/>
//                     <Route path="/movies/:id" component={MovieForm}/>
//                     <Route path="/movies" component={Movies}/>
//                     <Route path="/customers" component={Customers}/>
//                     <Route path="/rentals" component={Rentals}/>
//                     <Route path="/not-found" component={NotFound}/>
//
//                     <Redirect from="/" exact to="/movies"/>
//                     <Redirect to="/not-found"/>
//                 </Switch>
//             </main>
//
//
//             {/*<div className="container">*/}
//             {/*  <Movies/>*/}
//             {/*</div>*/}
//         </React.Fragment>
//     );
//
// }
//
export default App;
