import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StatusBar,
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

export default class JokerModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            code: ''
        }
    }

    render(){
        const {code} = this.state;
        const {closeJokerModal, JokerModalVisible} = this.props;
        return (
            <Modal
                visible={JokerModalVisible}
                animationType={'slide'}
                onRequestClose={this.closeJokerModal}
            >
                <View style={styles.modalContainer}>
                    <StatusBar
                        barStyle="dark-content"
                    />
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
                            onPress={closeJokerModal}
                            style={styles.buttonConfirm}
                        >
                            <Text style={styles.buttonText}>{'Potvrdi'.toUpperCase()}</Text>
                        </Button>
                        <Button
                            onPress={closeJokerModal}
                            style={styles.buttonClose}
                        >
                            <Text style={styles.buttonText}>{'Zatvori'.toUpperCase()}</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}

JokerModal.propTypes = {
    JokerModalVisible: PropTypes.bool.isRequired,
    closeJokerModal: PropTypes.func.isRequired
};
