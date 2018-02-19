import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    Modal,
    StatusBar,
    TouchableOpacity,
    CameraRoll
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
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

class AccountModal extends Component {
    constructor(props){
        super(props);
    }


    render(){
        const {closeGalleryModal, showGallery, setAvatar} = this.props;
        return (
            <Modal
                visible={showGallery}
                animationType={'slide'}
                onRequestClose={this.closeGalleryModal}
            >
                <StatusBar
                    barStyle="light-content"
                />
                <View style={styles.statusBar} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeGalleryModal}>
                        <Icon name="ios-arrow-back" color="white" size={35}></Icon>
                    </TouchableOpacity>
                </View>
                <CameraRollPicker
                    callback={(result)=>{
                        console.info("RES",result);
                        setAvatar(result[0].uri);
                        closeGalleryModal();
                    }}
                    selectSingleItem={true}
                />
            </Modal>
        );
    }
}

AccountModal.propTypes = {
    showGallery: PropTypes.bool.isRequired,
    closeGalleryModal: PropTypes.func.isRequired,
    setAvatar: PropTypes.func.isRequired
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({

    },dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountModal);
