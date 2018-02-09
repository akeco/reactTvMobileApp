import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    addSocket
} from '../../redux/actions/index';

import {
    View,
    Platform
} from 'react-native';
import { Spinner } from 'native-base';

import styles from './styles';

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:8086",
        android: "http://10.0.3.2:8086"
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
            const {addSocket, user} = this.props;
            this.socket = io(SERVER_URL);
            this.socket.on("connect", () => {
                addSocket(this.socket);
                this.setState({
                    socket: true
                });
            })
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
        addSocket
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    }
}

