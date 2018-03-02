import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Platform,
    StatusBar
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
        ios: "https://quizapp-api.herokuapp.com",
        android: "https://quizapp-api.herokuapp.com"
    }) :
    "https://quizapp-api.herokuapp.com";

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: 'test@test.com',
            //email: '',
            password: 'pass',
            //password: '',
            invalidEmail: false,
            invalidPassword: false
        };
    }

    validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    handleLogin = () => {
        const {email, password} = this.state,
            {addUser} = this.props;

        if(email && this.validateEmail(email) && password && password.length >= 4){
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
                }
            }).catch((error)=>{
                console.info("ERROR", error);
            });
        }
    };


    render(){
        const {email, password, invalidEmail, invalidPassword} = this.state;
        return (
            <View style={styles.view}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#0096A6"
                />
                <Item style={styles.item}>
                    <Input
                        name="email"
                        placeholder={invalidEmail ? 'Neispravan email' : 'Email'}
                        placeholderTextColor={invalidEmail ? 'white' : 'rgba(0,0,0,0.7)'}
                        value={email}
                        style={invalidEmail ? [styles.inputText, styles.errorInput] : styles.inputText}
                        onChangeText={(email) => {
                            if(this.validateEmail(email)){
                                this.setState({
                                    email: email.toLowerCase(),
                                    invalidEmail: false
                                })
                            }
                            else {
                                this.setState({
                                    email: email.toLowerCase(),
                                    invalidEmail: true
                                })
                            }
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder={invalidPassword ? 'Lozinka, minimalno 4 karaktera' : 'Lozinka'}
                        placeholderTextColor={invalidPassword ? 'white' : 'rgba(0,0,0,0.7)'}
                        secureTextEntry={true}
                        value={password}
                        style={invalidPassword ? [styles.inputText, styles.errorInput] : styles.inputText}
                        onChangeText={(password) => {
                            if(password.length > 3){
                                this.setState({
                                    password,
                                    invalidPassword: false
                                })
                            }
                            else {
                                this.setState({
                                    password,
                                    invalidPassword: true
                                })
                            }
                        }}
                    />
                </Item>
                <Button
                    block
                    style={styles.button}
                    onPress={this.handleLogin}
                >
                    <Text>PRIJAVI SE</Text>
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