import * as React from 'react';
import {
    Route, Switch, HashRouter, Redirect
} from 'react-router-dom';

import Index from '../main';

export default class RouterView extends React.Component<{}, {}> {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact={true} render={() => <Redirect to="/index" />} />
                    <Route path="/index" component={Index} />
                </Switch>
            </HashRouter>
        );
    }
}