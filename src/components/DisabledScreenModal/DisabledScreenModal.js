import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StatusBar,
    Modal
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

export default  DisabledScreenModal = ({disabledScreen, user}) => {
    return (
        <Modal
            visible={disabledScreen}
            animationType={'slide'}
            onRequestClose={this.closeJokerModal}
        >
            <StatusBar
                barStyle="light-content"
            />
            <View style={styles.statusBar} />
            <View style={styles.modalContainer}>
                <Icon name="ios-contact" color="white" size={85}/>
                <Text style={styles.messageText}>Korisnik <Text style={styles.username}>{user && user.username}</Text> je već aktivan na drugom mobilnom uređaju!</Text>
                <Text style={styles.smallText}>Dva korisnika ne mogu koristiti isti korisnički račun u isto vrijeme!</Text>
            </View>
        </Modal>
    );
}

DisabledScreenModal.propTypes = {
    disabledScreen: PropTypes.bool.isRequired,
    user: PropTypes.object
};
