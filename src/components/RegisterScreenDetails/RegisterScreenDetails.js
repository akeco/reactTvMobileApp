import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    AsyncStorage,
    TouchableHighlight,
    Platform,
    StatusBar
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
        ios: "https://quizapp-api.herokuapp.com",
        android: "https://quizapp-api.herokuapp.com"
    }) :
    "https://quizapp-api.herokuapp.com";


class RegisterScreenDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            gender: null,
            city: '',
            invalidCity: false,
            age: '',
            invalidAge: false,
            phoneNumber: '',
            invalidPhoneNumber: false,
        };
    }


    handleRegister = () => {
        const {registerDetails} = this.props;
        const {gender, city, age, phoneNumber} = this.state;
        if(gender && city && age && phoneNumber && registerDetails){

            axios.post(`http://localhost:3000/api/UserModels`, {
                ...registerDetails,
                gender,
                city,
                age,
                phoneNumber,
                emailVerified: false
            }).then((response)=>{
                console.info("RESPONSE", response);
                if(response.status == 200 && response.data.id){
                    axios.post(`http://localhost:3000/api/UserModels/${response.data.id}/accessTokens`)
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
        const {city, gender, age, phoneNumber, invalidAge, invalidCity, invalidPhoneNumber} = this.state;
        return (
            <View style={styles.view}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#0096A6"
                />
                <Item style={styles.item}>
                    <Input
                        placeholder={invalidPhoneNumber ? 'Neispravn broj telefona' : 'Broj telefona'}
                        placeholderTextColor={invalidPhoneNumber ? 'white' : 'rgba(0,0,0,0.7)'}
                        style={invalidPhoneNumber ? [styles.inputText, styles.errorInput] : styles.inputText}
                        value={phoneNumber}
                        onChangeText={(phoneNumber) => {
                            if(!isNaN(phoneNumber) && phoneNumber.length <= 16 && phoneNumber.length >= 8){
                                this.setState({
                                    phoneNumber,
                                    invalidPhoneNumber: false
                                })
                            }
                            else {
                                this.setState({
                                    phoneNumber,
                                    invalidPhoneNumber: true
                                })
                            }
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder={invalidCity ? 'Grad, neispravan unos' : 'Grad'}
                        placeholderTextColor={invalidCity ? 'white' : 'rgba(0,0,0,0.7)'}
                        style={invalidCity ? [styles.inputText, styles.errorInput] : styles.inputText}
                        value={city}
                        onChangeText={(city) => {
                            if(isNaN(city) && city.length >= 2){
                                this.setState({
                                    city,
                                    invalidCity: false
                                })
                            }
                            else {
                                this.setState({
                                    city,
                                    invalidCity: true
                                })
                            }
                        }}
                    />
                </Item>
                <Item style={styles.item}>
                    <Input
                        placeholder={invalidAge ? 'Godište, neispravan unos' : 'Godište'}
                        placeholderTextColor={invalidAge ? 'white' : 'rgba(0,0,0,0.7)'}
                        style={invalidAge ? [styles.inputText, styles.errorInput] : styles.inputText}
                        value={age}
                        onChangeText={(age) => {
                            if(!isNaN(age) && age > 7 && age < 110){
                                this.setState({
                                    age,
                                    invalidAge: false
                                })
                            }
                            else {
                                this.setState({
                                    age,
                                    invalidAge: true
                                })
                            }
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
                    <Text>REGISTRUJ SE</Text>
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
        addUser
    },dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        registerDetails: state.registerDetails,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(RegisterScreenDetails);