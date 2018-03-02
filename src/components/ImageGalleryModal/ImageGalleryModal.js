import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    Modal,
    Platform,
    TouchableOpacity,
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import PromptModal from "react-native-modal";
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
        this.state = {
            showConfirmModal: false,
            resultIMG: null
        }
    }


    render(){
        const {closeGalleryModal, showGallery, setAvatar} = this.props;
        const {showConfirmModal, resultIMG} = this.state;
        return (
            <Modal
                visible={showGallery}
                animationType={'slide'}
                onRequestClose={this.closeGalleryModal}
            >
                <Header
                    style={styles.header}
                    iosBarStyle="light-content"
                    androidStatusBarColor="#0096A6"
                    backgroundColor="#00BBD3"
                >
                    <Left style={styles.leftIcon}>
                        <TouchableOpacity onPress={closeGalleryModal}>
                            <Icon
                                name={Platform.select({
                                    ios: "ios-arrow-back",
                                    android: "md-arrow-back"
                                })}
                                color="white" size={30}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Text  style={styles.headerTitle}>ALBUM</Text>
                    </Body>
                </Header>

                <CameraRollPicker
                    callback={(result)=>{
                        console.info("RES",result);
                        if(result && result.length){
                            this.setState({
                                showConfirmModal: true,
                                resultIMG: result[0].uri
                            });
                        }
                    }}
                    selectSingleItem={true}
                />
                <PromptModal
                    isVisible={showConfirmModal}
                    onBackdropPress={()=> this.setState({showConfirmModal: false})}
                    onSwipe={()=> this.setState({showConfirmModal: false})}
                    swipeDirection="up"
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={styles.modalPrompt}>
                            <View style={styles.modalTitle}>
                                <Text style={styles.titleText}>Da li želite postaviti sliku na profil?</Text>
                            </View>
                            <View style={styles.modalBody}>
                                <Text>Svaka promjena slike zahtjeva sigurnosnu provjeru.</Text>
                                <Text>Vaša slika će biti ubrzo dostupna.</Text>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    light
                                    style={styles.discardButton}
                                    onPress={()=>{
                                        this.setState({
                                            showConfirmModal: false
                                        })
                                    }}
                                >
                                    <Text>ZATVORI</Text>
                                </Button>
                                <Button
                                    style={styles.confirmButton}
                                    onPress={()=>{
                                        setAvatar(resultIMG);

                                        this.setState({
                                            showConfirmModal: false,
                                            resultIMG: null
                                        }, ()=>{
                                            setTimeout(closeGalleryModal, 1000);
                                        });

                                    }}
                                >
                                    <Text>SAČUVAJ</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </PromptModal>
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
