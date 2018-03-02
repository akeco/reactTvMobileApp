import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    AsyncStorage,
    TouchableHighlight,
    Platform,
    StatusBar,
} from 'react-native';

import {
    addUser,
    addRegisterDetails
} from '../../redux/actions'
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    Container,
    Button,
    Text,
    Radio,
    Right,
    ListItem,
    Input,
    Item
} from 'native-base';

import styles from './styles';

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "https://quizapp-api.herokuapp.com",
        android: "https://quizapp-api.herokuapp.com"
    }) :
    "https://quizapp-api.herokuapp.com";


class RegisterScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            invalidEmail: false,
            password: '',
            invalidPassword: false,
            confirmPass: '',
            invalidConfirmPass: '',
            username: '',
            invalidUsername: '',
        };
    }

    validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    nextStep = () =>{
        const {addRegisterDetails} = this.props;
        const {email, password, confirmPass, username, invalidEmail, invalidPassword, invalidConfirmPass, invalidUsername} = this.state;
        if(email && password && confirmPass && username && password === confirmPass && !invalidEmail && !invalidPassword && !invalidConfirmPass && !invalidUsername){
            addRegisterDetails({
                email,
                password,
                username
            }).then(()=>{
                Actions.push("register-details");
            });
        }
    };


    render(){
        const {email, password, confirmPass, username, invalidEmail, invalidPassword, invalidConfirmPass, invalidUsername} = this.state;
        return (
            <View style={styles.view}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#0096A6"
                />
                <Item style={styles.item}>
                    <Input
                        placeholder={invalidUsername ? 'Korisnički račun, minimalno 4 karaktera' : 'Korisnički račun'}
                        placeholderTextColor={invalidUsername ? 'white' : 'rgba(0,0,0,0.7)'}
                        style={invalidUsername ? [styles.inputText, styles.errorInput] : styles.inputText}
                        value={username}
                        onChangeText={(username) => {
                            if(username.length > 3){
                                this.setState({
                                    username,
                                    invalidUsername: false
                                })
                            }
                            else {
                                this.setState({
                                    username,
                                    invalidUsername: true
                                })
                            }
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder={invalidEmail ? 'Neispravan email' : 'Email'}
                        placeholderTextColor={invalidEmail ? 'white' : 'rgba(0,0,0,0.7)'}
                        style={invalidEmail ? [styles.inputText, styles.errorInput] : styles.inputText}
                        value={email}
                        onChangeText={(email) => {
                            if(this.validateEmail(email.toLowerCase())){
                                this.setState({
                                    email: email.toLowerCase(),
                                    invalidEmail: false
                                });
                            }
                            else{
                                this.setState({
                                    email: email.toLowerCase(),
                                    invalidEmail: true
                                });
                            }
                        }}
                    />
                </Item>

                <Item style={styles.item}>
                    <Input
                        placeholder={invalidPassword ? 'Lozinka, minimalno 4 karaktera' : 'Lozinka'}
                        placeholderTextColor={invalidPassword ? 'white' : 'rgba(0,0,0,0.7)'}
                        style={invalidPassword ? [styles.inputText, styles.errorInput] : styles.inputText}
                        secureTextEntry={true}
                        value={password}
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
                <Item style={styles.item}>
                    <Input
                        placeholder={invalidConfirmPass ? 'Potvrda lozinke, neispravan unos' : 'Potvrdi lozinku'}
                        placeholderTextColor={invalidConfirmPass ? 'white' : 'rgba(0,0,0,0.7)'}
                        style={invalidConfirmPass ? [styles.inputText, styles.errorInput] : styles.inputText}
                        secureTextEntry={true}
                        value={confirmPass}
                        onChangeText={(confirmPass) => {
                            if(confirmPass.length > 3 && confirmPass === this.state.password){
                                this.setState({
                                    confirmPass,
                                    invalidConfirmPass: false,
                                })
                            }
                            else {
                                this.setState({
                                    confirmPass,
                                    invalidConfirmPass: true,
                                })
                            }
                        }}
                    />
                </Item>
                <Button
                    block
                    style={styles.button}
                    onPress={this.nextStep}
                >
                    <Text>NASTAVI DALJE</Text>
                </Button>
                <TouchableHighlight
                    onPress={()=>{
                        Actions.push("login");
                    }}
                    style={styles.registerText}
                >
                    <Text>Prijavi se</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addUser,
        addRegisterDetails
    },dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(RegisterScreen);