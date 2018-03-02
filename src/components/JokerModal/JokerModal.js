import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
    Modal,
    Platform
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
    Item,
    Input
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
                <Header
                    style={styles.header}
                    iosBarStyle="light-content"
                    androidStatusBarColor="#0096A6"
                    backgroundColor="#00BBD3"
                >
                    <Left style={styles.leftIcon}>
                        <TouchableOpacity onPress={closeJokerModal}>
                            <Icon
                                name={Platform.select({
                                    ios: "ios-arrow-back",
                                    android: "md-arrow-back"
                                })}
                                color="white" size={30}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Text  style={styles.headerTitle}>JOKER KODOVI</Text>
                    </Body>
                </Header>

                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <Item style={styles.item}>
                            <Input
                                placeholder="Unesi joker kod"
                                placeholderTextColor="rgba(0,0,0,0.7)"
                                value={code}
                                style={styles.inputText}
                                onChangeText={(code) => {
                                    this.setState({
                                        code
                                    })
                                }}
                            />
                        </Item>
                        <Button
                            onPress={closeJokerModal}
                            style={styles.buttonConfirm}
                        >
                            <Text style={styles.buttonText}>{'Potvrdi'.toUpperCase()}</Text>
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
