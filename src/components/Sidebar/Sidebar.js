import React, {Component} from 'react';
import {
    View,
    ImageBackground,
    AsyncStorage,
    Modal,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

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
            modalVisible: false,
            code: ''
        };
    }

    openModal = () => {
        this.setState({modalVisible:true});
    };

    closeModal = () => {
        this.setState({modalVisible:false});
    };

    logOut = () => {
        AsyncStorage.removeItem("quizUser");
        Actions.push("rootLogin");
    };

    render(){
        const {modalVisible, code} = this.state;
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
                            <ListItem icon button onPress={()=>{
                                Actions.push("userAccount");
                            }}>
                                <Left>
                                    <Icon name="ios-contact-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text>Korisnicki racun</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button onPress={this.openModal}>
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
                <Modal
                    visible={modalVisible}
                    animationType={'slide'}
                    onRequestClose={this.closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <TextInput
                                name="code"
                                placeholderTextColor="rgba(0,0,0,0.7)"
                                placeholder="Unesi joker code"
                                style={styles.inputText}
                                value={code}
                                onChangeText={(code) => {
                                    this.setState({
                                        code
                                    });
                                }}
                            />
                            <Button
                                onPress={() => this.closeModal()}
                                style={styles.buttonConfirm}
                            >
                                <Text style={styles.buttonText}>{'Potvrdi'.toUpperCase()}</Text>
                            </Button>
                            <Button
                                onPress={() => this.closeModal()}
                                style={styles.buttonClose}
                            >
                                <Text style={styles.buttonText}>{'Zatvori'.toUpperCase()}</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
