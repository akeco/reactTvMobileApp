import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    View,
    StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    Container,
    Header,
    Button,
    Content,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Switch,
    Toast,
    Root
} from 'native-base';

import styles from './styles';

class EmailVerifyScreen extends Component {
    constructor(props){
        super(props);
    }

    sendEmail = () =>{
        Toast.show({
            text: 'Email za verifikaciju poslat! Provjerite vaš inbox.',
            position: 'bottom',
            duration: 3000
        });
    };

    render(){
        const {user} = this.props;
        if(user && user.email) {
            const {email} = user;
            return (
                <View style={styles.content}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="transparent"
                    />
                    <View style={styles.mainWrapper}>
                        <Icon name="ios-mail" color="white" size={85}/>
                        <Text style={[styles.messageText, {fontWeight: 'bold'}]}>
                            Email za verifikaciju poslat na <Text style={styles.username}>{email}</Text>
                        </Text>
                        <Text style={[styles.messageText, {marginTop: 25}]}>Molimo provjerite vaš inbox da biste sudjelovali u kvizu!</Text>
                        <Text style={styles.smallText}>Ukoliko niste primili email u roku par minuta, kliknite pošalji ponovo.</Text>
                        <Button
                            block
                            iconLeft
                            style={styles.button}
                            onPress={this.sendEmail}
                        >
                            <Icon name='ios-mail' color="white" size={25} />
                            <Text>POŠALJI PONOVO</Text>
                        </Button>
                    </View>
                </View>
            )
        }
        else return null;
    }
};

export default connect(function (state) {
    return {
        user: state.user
    }
})(EmailVerifyScreen);


