import React from "react";
import { Route } from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

export default class Root extends React.Component {
    render = () => 
    (  
        <div className="app">
             <style>
                {`
                    body {
                        background: #f7f7f7;
                    }
                `}
             </style>  

            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Register} />
            <Route path="/dashboard" exact component={Dashboard} />

        </div>
    );
}