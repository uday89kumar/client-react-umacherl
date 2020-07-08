import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './index.css';
import CourseManager from './containers/CourseManager';
import {WidgetReducer} from "./reducers/WidgetReducer";

let store = createStore(WidgetReducer)

ReactDOM.render(
    <Provider store={store}>
        <CourseManager/>
    </Provider>,
    document.getElementById('root')
);