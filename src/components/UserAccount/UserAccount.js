import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import {
    Container,
    Button,
    Text,
    Spinner,
    List,
    ListItem,
    Left,
    Body
} from 'native-base';
import {
    addUser
} from '../../redux/actions'

import styles from './styles';

class UserAccount extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {user} = this.props;
        return (
            <View style={styles.view}>
                <StatusBar
                    barStyle="dark-content"
                />
                <List>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-contact-outline" size={30} />
                        </Left>
                        <Body>
                            <Text>{user.username}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-at-outline" size={30} />
                        </Left>
                        <Body>
                            <Text>{user.email}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-phone-portrait-outline" size={30} />
                        </Left>
                        <Body>
                            <Text>{user.phoneNumber}</Text>
                        </Body>
                    </ListItem>
                </List>
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
        user: state.user
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(UserAccount);