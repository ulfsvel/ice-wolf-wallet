import React from "react";
import {Route, Redirect} from "react-router-dom"
import {State} from "../redux/store";
import {connect} from "react-redux";
import User from "../types/User";

interface PrivateRouteProps {
    user: User | null
    children: any,
    path: string,
    exact: boolean
}

const PrivateRoute = ({children, user, path, exact}: PrivateRouteProps) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={({location}) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state: State) => ({
    user: state.user.appUser
});

export default connect(mapStateToProps)(PrivateRoute);