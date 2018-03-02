import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import {
    addSocket,
    addUser,
    initialJokerCall,
    initialUsedJokers,
    addAvatarURL
} from '../../redux/actions';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
    Platform,
    AsyncStorage,
    NetInfo,
} from 'react-native';
import { Spinner } from 'native-base';

import LoginPage from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import HomeScreen from '../HomeScreen';
import SocketConnectionHoC from '../SocketConnectionHoC';
import EmailVerifyScreen from '../EmailVerifyScreen';
import OfflineScreen from '../OfflineScreen';


const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "https://quizapp-api.herokuapp.com",
        android: "https://quizapp-api.herokuapp.com"
    }) :
    "https://quizapp-api.herokuapp.com";

class NetworkHoC extends Component {
    constructor(props){
        super(props);
        this.state = {
            authorized: null,
            networkOnline: null
        }
    }

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleNetworkEvent);
        AsyncStorage.getItem("quizUser").
        then((user)=>{
            if(user){
                user = JSON.parse(user);
                if(user.id && user.userId){
                    const token = user.id;
                    axios.get(`${SERVER_URL}/api/UserModels/${user.userId}/accessTokens/${token}`)
                        .then((response)=>{
                            console.info("VALID TOKEN", response);
                            if(response.status == 200){
                                this.setState({
                                    authorized: true
                                });
                            }
                        }).catch((error)=>{
                        console.info("ERROR", error);
                        this.setState({
                            authorized: false
                        });
                    });
                }
            }
            else {
                this.setState({
                    authorized: false
                });
            }
        }).catch((err)=>{
            this.setState({
                authorized: false
            });
        });
    }

    componentWillUnmount(){
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleNetworkEvent);
    }

    handleNetworkEvent = (isConnected) =>{
        alert('Then, is ' + (isConnected ? 'online' : 'offline'));
        this.setState({
            networkOnline: isConnected
        })
    };

    render(){
        const {authorized, networkOnline} = this.state;
        return (
            <Router>
                <Stack key="root">
                    <Scene
                        key="rootLogin"
                        initial={authorized === false && networkOnline}
                        navTransparent={true}
                        tabs={true}
                        hideTabBar={true}
                    >
                        <Scene
                            key="login"
                            component={LoginPage}
                            initial
                            navTransparent={true}
                        />
                        <Scene
                            key="register"
                            component={RegisterScreen}
                            navTransparent={true}
                        />
                    </Scene>

                    <Scene
                        key="content"
                        initial={authorized && networkOnline}
                        navTransparent={true}
                        tabs={true}
                        hideTabBar={true}
                    >
                        <Scene
                            key="home"
                            component={SocketConnectionHoC(HomeScreen)}
                            navTransparent={true}
                            initial
                        />
                        <Scene
                            key="emailVerifyScreen"
                            component={EmailVerifyScreen}
                            navTransparent={true}
                        />
                    </Scene>

                    <Scene
                        key="offline"
                        initial={networkOnline === false}
                        navTransparent={true}
                        tabs={true}
                        hideTabBar={true}
                    >
                        <Scene
                            key="offlineScreen"
                            component={OfflineScreen}
                            navTransparent={true}
                            initial
                        />
                    </Scene>
                </Stack>
            </Router>
        )
    }
}

export default NetworkHoC;

