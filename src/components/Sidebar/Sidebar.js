import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    View,
    ImageBackground,
    AsyncStorage,
    Image,
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
    Toast,
    Spinner
} from 'native-base';

import styles from './styles';

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            JokerModalVisible: false,
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
        const {socket} = this.props;
        AsyncStorage.removeItem("quizUser");
        socket.emit('forceDisconnect');
        Actions.push("rootLogin");
    };

    render(){
        const {JokerModalVisible, AccountModalVisible} = this.state;
        const {avatarURL} = this.props;
        return (
            <View style={styles.sidebarWrapper}>
                <ImageBackground
                    style={styles.imageWrapper}
                    resizeMode="cover"
                    source={require('../../images/blue-background.png')}
                >
                    {
                        avatarURL &&
                        <View style={styles.avatarView}>
                            {
                                !avatarURL.approved && <View style={styles.imageLoader} ><Spinner color='white' /></View>
                            }
                            <Image
                                source={{uri: avatarURL.url}}
                                style={styles.avatarImage}
                            />
                        </View> ||
                        <Icon name="ios-contact" color="white" size={85} />
                    }
                </ImageBackground>
                <Container>
                    <Content>
                        <List>
                            <ListItem icon button onPress={this.openAccountModal}>
                                <Left>
                                    <Icon style={styles.text} name="ios-contact-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Korisnički račun</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button onPress={this.openJokerModal}>
                                <Left>
                                    <Icon style={styles.text} name="ios-barcode-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Joker Kodovi</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button onPress={()=>{}}>
                                <Left>
                                    <Icon style={styles.text} name="ios-help-circle-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Uputstva</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button onPress={this.logOut}>
                                <Left>
                                    <Icon style={styles.text} name="ios-log-out-outline" size={25} />
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Izlaz</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
                {
                    JokerModalVisible && <JokerModal closeJokerModal={this.closeJokerModal} {...this.state} />
                }
                {
                    AccountModalVisible && <AccountModal closeAccountModal={this.closeAccountModal}{...this.state}/>
                }
            </View>
        );
    }
}


export default connect(function (state) {
    return {
        avatarURL: state.avatarURL,
        socket: state.socket
    }
})(Sidebar);


