import * as React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './configuration/Configuration';

export default [
    <Route exact path="/configuration" render={() => <Configuration />} />,
    // <Route exact path="/segments" render={() => <Segments />} />,
];
