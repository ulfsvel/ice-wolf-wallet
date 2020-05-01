import React from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import ThemeWrapper from "./components/ThemeWrapper";
import CenterOnPageWrapper from "./components/UserPagesWrapper";
import Auth from "./components/pages/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Wrapper from "./components/Wrapper";
import Dashboard from "./components/pages/Dashboard";
import PasswordReset from "./components/pages/PasswordReset";
import {connect} from "react-redux";
import {initAppThunk} from "./redux/thunks/app";
import {AppState} from "./redux/reducers/app";
import {State} from "./redux/store";
import LoadingAnimation from "./components/LoadingAnimation";
import TransferFounds from "./components/pages/TransferFounds";

interface AppProps {
    app: AppState
    dispatch: (arg0: any) => void
}

const App = ({app, dispatch}: AppProps) => {

    if (!app.isInitialised) {
        dispatch(initAppThunk());
        return <ThemeWrapper>
            <Wrapper>
                <LoadingAnimation/>
            </Wrapper>
        </ThemeWrapper>
    }

    return <ThemeWrapper>
        <BrowserRouter>
            <Switch>
                <Route exact path="/auth/reset/:resetToken">
                    <CenterOnPageWrapper>
                        <PasswordReset/>
                    </CenterOnPageWrapper>
                </Route>
                <Route exact path="/auth">
                    <CenterOnPageWrapper>
                        <Auth/>
                    </CenterOnPageWrapper>
                </Route>
                <PrivateRoute exact path="/transfer-founds/:walletTypeString/:publicAddress">
                    <CenterOnPageWrapper>
                        <TransferFounds/>
                    </CenterOnPageWrapper>
                </PrivateRoute>
                <PrivateRoute exact path="/">
                    <Wrapper>
                        <Dashboard/>
                    </Wrapper>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    </ThemeWrapper>
};

const mapStateToProps = (state: State) => ({
    app: state.app,
});

export default connect(mapStateToProps)(App);
