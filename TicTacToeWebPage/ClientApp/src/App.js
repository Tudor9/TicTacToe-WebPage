import React, { Fragment } from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from "react-router-dom";
import './custom.css'
import NavMenu from './components/NavMenu';
import Home from './components/Home'
import Register from './components/Register/Register';
import TicTacToeMain from "./components/TicTacToe/TicTacToeMain";
import Login from './components/Login/Login';
import PrivateRoute from "./Routes/PrivateRoute"
import UnauthenticatedRoute from "./Routes/UnauthenticatedRoute";
import TicTacToeEasy from "./components/TicTacToe/TicTacToeEasy";
import TicTacToeHard from "./components/TicTacToe/TicTacToeHard";

function App() {
    return (
        <Switch>
            <UnauthenticatedRoute path="/Register" component={Register}/>
            <UnauthenticatedRoute path="/Login" component={Login}/>
            <Fragment>
                <NavMenu/>
                <PrivateRoute exact path="/" component={Home}/>
                <PrivateRoute path="/TicTacToeEasy" component={TicTacToeEasy}/>
                <PrivateRoute path="/TicTacToeMain" component={TicTacToeMain}/>
                <PrivateRoute path="/TicTacToeHard" component={TicTacToeHard}/>
                <Redirect to="/"/>
            </Fragment>
        </Switch>
    );
}

export default App
