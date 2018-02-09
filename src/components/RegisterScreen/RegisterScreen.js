import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    AsyncStorage,
    TouchableHighlight,
    Platform
} from 'react-native';

import {
    addUser
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
        ios: "http://localhost:3000",
        android: "http://10.0.3.2:3000"
    }) :
    "https://my-production-url.com";


class RegisterScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPass: '',
            username: '',
            gender: null,
            city: '',
            age: '',
            phoneNumber: ''
        };
    }

    handleRegister = () => {
        const {addUser} = this.props;
        const {email, password, confirmPass, username, gender, city, age, phoneNumber} = this.state;
        if(email && password && confirmPass && password == confirmPass && username && gender && city && age && phoneNumber){
            axios.post(`${SERVER_URL}/api/UserModels`, {
                email,
                password,
                username,
                gender,
                city,
                age,
                phoneNumber,
                emailVerified: false
            }).then((response)=>{
                console.info("RESPONSE", response);
                if(response.status == 200 && response.data.id){
                    axios.post(`${SERVER_URL}/api/UserModels/${response.data.id}/accessTokens`)
                        .then((userResponse)=>{
                            if(userResponse.status == 200){
                                const userDetails = Object.assign({}, response.data, userResponse.data);
                                AsyncStorage.setItem("quizUser", JSON.stringify(userDetails));
                                addUser(response.data);
                                Actions.push("content");
                            }

                        }).catch((error)=>{
                            console.info("FETCH TOKEN ERROR", error);
                    });
                }
            }).catch((error)=>{
                console.info("ERROR", error);
            });
        }
    };


    render(){
        const {email, password, confirmPass, username, city, gender, age, phoneNumber} = this.state;
        return (
            <View style={styles.view}>
                <Item style={styles.item}>
                    <Input
                        placeholder="Username"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        value={username}
                        style={styles.inputText}
                        onChangeText={(username) => {
                            this.setState({
                                username
                            })
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
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
                        placeholder="Broj telefona"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        value={phoneNumber}
                        style={styles.inputText}
                        onChangeText={(phoneNumber) => {
                            this.setState({
                                phoneNumber
                            })
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder="Grad"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        value={city}
                        style={styles.inputText}
                        onChangeText={(city) => {
                            this.setState({
                                city
                            })
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder="Godište"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        value={age}
                        style={styles.inputText}
                        onChangeText={(age) => {
                            this.setState({
                                age
                            })
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder="Password"
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
                <Item style={styles.item}>
                    <Input
                        placeholder="Confirm password"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        secureTextEntry={true}
                        value={confirmPass}
                        style={styles.inputText}
                        onChangeText={(confirmPass) => {
                            this.setState({
                                confirmPass
                            })
                        }}
                    />
                </Item>
                <View style={styles.radioView}>
                    <ListItem
                        style={styles.radioListItem}
                        onPress={()=>{
                            this.setState({
                                gender: "musko"
                            });
                        }}
                    >
                        <Text>Muško</Text>
                        <Right style={styles.right}>
                            <Radio selected={gender === "musko" || false} />
                        </Right>
                    </ListItem>
                    <ListItem
                        style={styles.radioListItem}
                        onPress={()=>{
                            this.setState({
                                gender: "zensko"
                            });
                        }}
                    >
                        <Text>Žensko</Text>
                        <Right style={styles.right}>
                            <Radio selected={gender === "zensko" || false} />
                        </Right>
                    </ListItem>
                </View>
                <Button
                    block
                    style={styles.button}
                    onPress={this.handleRegister}
                >
                    <Text>REGISTER</Text>
                </Button>
                <TouchableHighlight
                    onPress={()=>{
                        Actions.push("login");
                    }}
                    style={styles.registerText}
                >
                    <Text>Login</Text>
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

export default connect(mapStateToProps, matchDispatchToProps)(RegisterScreen);