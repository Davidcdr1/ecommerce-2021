import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Product } from '../components/Product';
import { AuthRouter } from "./AuthRouter";


export const AppRouter = () => {
    return (
        <Router>
        <div>
            <Switch>
                <Route
                    path="/auth"
                    component= { AuthRouter}
                />
                <Route
                    path="/" exact
                    component= { Product }
                />
            </Switch>
        </div>
        </Router>
    )
}
