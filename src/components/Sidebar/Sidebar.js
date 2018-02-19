import React, {Component} from 'react';
import {
    View,
    ImageBackground,
    AsyncStorage,
    Modal,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import JokerModal from '../JokerModal';
import AccountModal from '../AccountModal';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    Container,
    Header,
    Button,
    Content,
    List,
    ListItem,
    Text,
    Left,
    Body,
    Right,
    Switch,
} from 'native-base';

import styles from './styles';

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            JokerModalVisible: false,
            AccountModalVisible: false,
        };
    }

    openJokerModal = () => {
        this.setState({JokerModalVisible:true});
    };

    closeJokerModal = () => {
        this.setState({JokerModalVisible:false});
    };

    openAccountModal = () => {
        this.setState({AccountModalVisible:true});
    };

    closeAccountModal = () => {
        this.setState({AccountModalVisible:false});
    };

    logOut = () => {
        AsyncStorage.removeItem("quizUser");
        Actions.push("rootLogin");
    };

    render(){
        const {JokerModalVisible, AccountModalVisible} = this.state;
        return (
            <View style={styles.sidebarWrapper}>
                <View style={styles.statusBar} />
                <ImageBackground
                    style={styles.imageWrapper}
                    resizeMode="cover"
                    source={require('../../images/blue-background.png')}
                >
                    <Icon name="ios-contact" color="white" size={85} />
                </ImageBackground>
                <Container>
                    <Content>
                        <List>
                            <ListItem icon button onPress={this.openAccountModal}>
                                <Left>
                                    <Icon name="ios-contact-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text>Korisnicki racun</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button onPress={this.openJokerModal}>
                                <Left>
                                    <Icon name="ios-barcode-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text>Joker Kodovi</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button onPress={()=>{}}>
                                <Left>
                                    <Icon name="ios-help-circle-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text>Uputstva</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button onPress={this.logOut}>
                                <Left>
                                    <Icon name="ios-log-out-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text>Izlaz</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
                {
                    JokerModalVisible && <JokerModal closeJokerModal={this.closeJokerModal} {...this.state} />
                }
                {
                    AccountModalVisible && <AccountModal closeAccountModal={this.closeAccountModal} {...this.state} />
                }
            </View>
        );
    }
}
