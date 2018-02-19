import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    addSocket,
    initialJokerCall,
    initialUsedJokers
} from '../../redux/actions/index';
import axios from 'axios';
import {
    View,
    Platform,
    AsyncStorage
} from 'react-native';
import { Spinner } from 'native-base';

import styles from './styles';

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:8086",
        android: "http://10.0.3.2:8086"
    }) :
    "https://my-production-url.com";

const API_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:3000",
        android: "http://10.0.3.2:3000"
    }) :
    "https://my-production-url.com";

export default SocketConnectionHoC = (CustomComponent) => (
    connect(mapStateToProps, matchDispatchToProps)(class SocketConnectionHoC extends Component{
        constructor(props){
            super(props);
            this.state = {
                socket: null
            }
        }

        shouldComponentUpdate(nextProps, nextState){
            if(nextState.socket != this.state.socket) return true;
            return false;
        }

        componentDidMount(){
            const {addSocket, user, initialJokerCall, initialUsedJokers} = this.props;
            this.socket = io(SERVER_URL);
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
                        axios.get(`${API_URL}/api/UserModels/${user.userId}?query[fields][jokers]`)
                            .then((response)=>{
                                initialJokerCall(response.data.jokers);
                                initialUsedJokers((response.data.jokers >= 10) ? 9 : response.data.jokers - 1 );
                            }).catch((error)=>{
                            console.info("JOKER ERROR", error);
                        });
                    }
                }
            }).catch((err)=>{
                console.info("Save user to reducer error", err);
            });
        }


        render() {
            const {socket} = this.state;
            if(socket) {
                return (
                    <View>
                        <CustomComponent/>
                    </View>
                );
            }
            else return (
                <View style={styles.loaderWrapper}>
                    <Spinner color='blue' />
                </View>
            );
        }
    })
)

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addSocket,
        initialJokerCall,
        initialUsedJokers
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    }
}

