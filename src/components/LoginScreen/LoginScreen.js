import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Platform,
} from 'react-native';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    Container,
    Button,
    Text,
    Input,
    Item
} from 'native-base';
import {
    addUser
} from '../../redux/actions'

import styles from './styles';

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:3000",
        android: "http://10.0.3.2:3000"
    }) :
    "https://my-production-url.com";

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: 'test@test.com',
            password: 'pass',
        };
    }

    handleLogin = () => {
        const {email, password} = this.state,
            {addUser} = this.props;

        if(email && password){
            axios.post(`${SERVER_URL}/api/UserModels/login`, {
                email,
                password
            }).then((response)=>{
                console.info("RESPONSE", response);
                if(response.status == 200 && response.data.id){

                    axios.get(`${SERVER_URL}/api/UserModels/${response.data.userId}`).then((userResponse)=>{
                        if(userResponse.status == 200 && userResponse.data){
                            const userDetails = Object.assign({}, userResponse.data, response.data);
                            AsyncStorage.setItem("quizUser", JSON.stringify(userDetails));
                            addUser(response.data);
                            Actions.push("content");
                        }
                    }).catch((error)=>{
                        console.info("GET ERROR", error);
                    });
                    /*
                    addLoginUser({
                        id: response.data.userId,
                        token: response.data.id
                    });

                    localStorage.setItem("quizApp", JSON.stringify({
                        token: response.data.id,
                        id: response.data.userId
                    }));
                    this.props.history.push("/");
                    */
                }
            }).catch((error)=>{
                console.info("ERROR", error);
            });
        }
    };


    render(){
        const {email, password} = this.state;
        return (
            <View style={styles.view}>
                <Item style={styles.item}>
                    <Input
                        name="email"
                        placeholder="Email"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        value={email}
                        style={styles.inputText}
                        onChangeText={(email) => {
                            this.setState({
                                email: email.toLowerCase()
                            })
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder="password"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        secureTextEntry={true}
                        value={password}
                        style={styles.inputText}
                        onChangeText={(password) => {
                            this.setState({
                                password
                            })
                        }}
                    />
                </Item>
                <Button
                    block
                    style={styles.button}
                    onPress={this.handleLogin}
                >
                    <Text>LOGIN</Text>
                </Button>

                <TouchableHighlight
                    onPress={()=>{
                        Actions.push("register");
                    }}
                    style={styles.registerText}
                >
                    <Text>Registracija</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addUser
    },dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginScreen);