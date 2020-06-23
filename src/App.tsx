import React, {useEffect} from "react";
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
import ChangeSecurityType from "./components/pages/ChangeSecurityType";
import TransferFunds from "./components/pages/TransferFunds";
import RecoverWallet from "./components/pages/RecoverWallet";

interface AppProps {
    app: AppState
    dispatch: (arg0: any) => void
}

const App = ({app, dispatch}: AppProps) => {
    useEffect(() => {
        if (!app.isInitialised) {
            dispatch(initAppThunk());
        }
    }, [app, dispatch]);


    if (!app.isInitialised) {
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
                <PrivateRoute exact path="/transfer-funds/:walletTypeString/:publicAddress">
                    <CenterOnPageWrapper>
                        <TransferFunds/>
                    </CenterOnPageWrapper>
                </PrivateRoute>
                <PrivateRoute exact path="/change-security-type/:walletTypeString/:publicAddress">
                    <CenterOnPageWrapper>
                        <ChangeSecurityType/>
                    </CenterOnPageWrapper>
                </PrivateRoute>
                <PrivateRoute exact path="/recover-wallet/:walletTypeString/:publicAddress">
                    <CenterOnPageWrapper>
                        <RecoverWallet/>
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
