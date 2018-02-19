import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
import axios from 'axios';
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

import {
    View,
    Modal,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Image,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageGalleryModal from '../ImageGalleryModal';
import {
    List,
    ListItem,
    Left,
    Body,
    Text
} from 'native-base';
import styles from './styles';

const API_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:3000",
        android: "http://10.0.3.2:3000"
    }) :
    "https://my-production-url.com";



class AccountModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showGallery: false,
            avatarURL: null
        }
    }

    closeGalleryModal = () => {
        this.setState({
            showGallery: false
        });
    };

    setAvatar = (avatarURL) => {
        this.uploadImage(avatarURL);

        this.setState({
            avatarURL
        });
    };


    uploadImage = (uri, mime = 'image/jpg') => {
        const {firebase, user} = this.props;
        let uploadBlob = null;

        const imageRef = firebase.storage().ref('avatars').child(user.userId);
        fs.readFile(uri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                // URL of the image uploaded on Firebase storage
                console.log(url);
                axios.patch(`${API_URL}/api/UserModels/${user.userId}`, {
                    avatarURL: url
                }).then((response)=>{
                    if(response.status == 200){
                        console.info("image changed");
                    }
                }).catch((error)=>{
                    console.info("image upload failed", error);
                })

            })
            .catch((error) => {
                console.log(error);
            })
    };


    render(){
        const {closeAccountModal, AccountModalVisible, user} = this.props;
        const {showGallery, avatarURL} = this.state;
        return (
            <Modal
                visible={AccountModalVisible}
                animationType={'slide'}
                onRequestClose={this.closeJokerModal}
            >
                {
                    user && (
                        <View style={styles.view}>
                            <StatusBar
                                barStyle="light-content"
                            />
                            <View style={styles.statusBar} />
                            <View style={styles.header}>
                                <TouchableOpacity onPress={closeAccountModal}>
                                    <Icon name="ios-arrow-back" color="white" size={35}></Icon>
                                </TouchableOpacity>
                            </View>
                            <ImageBackground
                                style={styles.imageWrapper}
                                resizeMode="cover"
                                source={require('../../images/blue-background.png')}
                            >
                                <TouchableOpacity onPress={()=> this.setState({showGallery: true})}>
                                    {
                                        avatarURL &&
                                            <View style={styles.avatarView}>
                                                <Image
                                                    source={{uri: avatarURL}}
                                                    style={styles.avatarImage}
                                                />
                                            </View> ||
                                        <Icon name="ios-contact" color="white" size={95} />
                                    }
                                </TouchableOpacity>
                            </ImageBackground>
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
                    )
                }
                {
                    showGallery && <ImageGalleryModal
                        closeGalleryModal={this.closeGalleryModal}
                        showGallery={showGallery}
                        setAvatar={this.setAvatar}
                    />
                }
            </Modal>
        );
    }
}

AccountModal.propTypes = {
    AccountModalVisible: PropTypes.bool.isRequired,
    closeAccountModal: PropTypes.func.isRequired
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({

    },dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.user,
        firebase: state.firebase
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountModal);
