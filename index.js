import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './App';


class ReactApp extends Component{
    render(){
        return(
            <App/>
        )
    }
}

AppRegistry.registerComponent('testApp', () => ReactApp);
