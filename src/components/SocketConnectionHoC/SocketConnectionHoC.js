import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
    View,
    Platform,
    AsyncStorage,
    StatusBar
} from 'react-native';
import { Spinner } from 'native-base';

import styles from './styles';

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "https://quiz-redis-engine.herokuapp.com",
        android: "https://quiz-redis-engine.herokuapp.com"
    }) :
    "https://quiz-redis-engine.herokuapp.com";

const LOCAL_SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:8086",
        android: "http://10.0.3.2:8086"
    }) :
    "https://my-production-url.com";

const API_URL = __DEV__ ?
    Platform.select({
        ios: "https://quizapp-api.herokuapp.com",
        android: "https://quizapp-api.herokuapp.com"
    }) :
    "https://quizapp-api.herokuapp.com";

export default SocketConnectionHoC = (CustomComponent) => (
    connect(mapStateToProps, matchDispatchToProps)(class SocketConnectionHoC extends Component{
        constructor(props){
            super(props);
            this.state = {
                socket: null,
                emailVerified: false
            }
        }

        shouldComponentUpdate(nextProps, nextState){
            if(nextState.socket != this.state.socket) return true;
            if(nextState.emailVerified != this.state.emailVerified) return true;
            return false;
        }

        componentDidMount(){
            const {addSocket, user, initialJokerCall, initialUsedJokers, addAvatarURL, addUser} = this.props;
            //this.socket = io(SERVER_URL);
            this.socket = io(LOCAL_SERVER_URL);
            this.socket.on("connect", () => {
                addSocket(this.socket);
                this.setState({
                    socket: true
                });
            });

            AsyncStorage.getItem("quizUser").then((user)=>{
                if(user){
                    user = JSON.parse(user);
                    if(user.id && user.userId){
                        addUser(user);
                        axios.get(`${API_URL}/api/UserModels/${user.userId}?query[fields][jokers]`)
                            .then((response)=>{
                            if(response && response.data){
                                if(response.data.emailVerified){
                                    this.setState({
                                        emailVerified: true
                                    });
                                    if(response.data.jokers) {
                                        initialJokerCall(response.data.jokers);
                                        initialUsedJokers((response.data.jokers >= 10) ? 9 : response.data.jokers - 1 );
                                    }
                                    if(response.data.temporaryAvatarURL) addAvatarURL({
                                        approved: false,
                                        url: response.data.temporaryAvatarURL
                                    });
                                    else if(response.data.avatarURL) addAvatarURL({
                                        approved: true,
                                        url: response.data.avatarURL
                                    });
                                }
                                else Actions.push("emailVerifyScreen");
                            }
                            }).catch((error)=>{
                                console.info("JOKER ERROR", error);
                        });
                    }
                }
            }).catch((err)=>{
                console.info("Save user to reducer error", err);
            });
        }


        componentWillUnmount(){
            this.socket.disconnect();
        }


        render() {
            const {socket, emailVerified} = this.state;
            if(socket && emailVerified) {
                return (
                    <View>
                        <CustomComponent/>
                    </View>
                );
            }
            else return (
                <View class={styles.emptyWrapper}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <View style={styles.loaderWrapper}>
                        <Spinner color='white' />
                    </View>
                </View>
            );
        }
    })
)

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addSocket,
        addUser,
        initialJokerCall,
        initialUsedJokers,
        addAvatarURL
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    }
}

