import * as React from 'react';
import {
    Route
} from 'react-router-dom';
import Login from '../page/login/Login';
import Home from '../page/home/home';
export default class RouterView extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Route exact={true} path="/index" component={Home} />
                <Route exact={true} path="/index/login"  component={Login} />
            </div>
        );
    }
}