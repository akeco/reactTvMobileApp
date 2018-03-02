import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImageResizer from 'react-native-image-resizer';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageGalleryModal from '../ImageGalleryModal';
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
import axios from 'axios';
//window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
import {addAvatarURL} from '../../redux/actions'
import {
    View,
    Modal,
    Platform,
    TouchableOpacity,
    ImageBackground,
    Image,
    AsyncStorage
} from 'react-native';

import {
    Container,
    List,
    ListItem,
    Left,
    Body,
    Text,
    Spinner,
    Header
} from 'native-base';

import styles from './styles';

const API_URL = __DEV__ ?
    Platform.select({
        ios: "https://quizapp-api.herokuapp.com",
        android: "https://quizapp-api.herokuapp.com"
    }) :
    "https://quizapp-api.herokuapp.com";



class AccountModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showGallery: false
        }
    }

    closeGalleryModal = () => {
        console.info("HIDE");
        this.setState({
            showGallery: false
        });
    };

    setAvatar = (avatarURL) => {
        this.uploadImage(avatarURL);
    };


    uploadImage = (uri, mime = 'image/jpg') => {
        const {firebase, user, addAvatarURL} = this.props;
        let uploadBlob = null;

        ImageResizer.createResizedImage(uri, 200, 200, 'JPEG', 99, 0, null).then((response) => {
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            // response.path is the path of the new image
            // response.name is the name of the new image with the extension
            // response.size is the size of the new image
            if(response && response.path){
                const imageRef = firebase.storage().ref('avatars').child(user.userId);
                fs.readFile(response.path, 'base64')
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
                        axios.patch(`${API_URL}/api/UserModels/${user.userId}`, {
                            temporaryAvatarURL: url
                        }).then((response)=>{
                            if(response.status == 200){
                                console.log("image changed", url);
                                addAvatarURL({
                                    url,
                                    approved: false
                                });
                                AsyncStorage.getItem("quizUser").then((user)=>{
                                    if(user){
                                        user = JSON.parse(user);
                                        if(user){
                                            const userDetails = Object.assign({}, user, {
                                                temporaryAvatarURL: url
                                            });
                                            AsyncStorage.setItem("quizUser", JSON.stringify(userDetails));
                                        }
                                    }
                                }).catch((err)=>{
                                    console.info("Save user to reducer error", err);
                                });
                            }
                        }).catch((error)=>{
                            console.info("image upload failed", error);
                        })

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
            console.info("RESIZE error"+err);
        });
    };


    render(){
        const {closeAccountModal, AccountModalVisible, user, avatarURL} = this.props;
        const {showGallery} = this.state;

        return (
            <Modal
                visible={AccountModalVisible}
                animationType={'slide'}
                onRequestClose={closeAccountModal}
            >
                <Header
                    style={styles.header}
                    iosBarStyle="light-content"
                    androidStatusBarColor="#0096A6"
                    backgroundColor="#00BBD3"
                >
                    <Left style={styles.leftIcon}>
                        <TouchableOpacity onPress={closeAccountModal}>
                            <Icon
                                name={Platform.select({
                                    ios: "ios-arrow-back",
                                    android: "md-arrow-back"
                                })}
                                color="white" size={30}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Text style={styles.headerTitle}>KORISNIČKI RAČUN</Text>
                    </Body>
                </Header>
                {
                    user && (
                        <View style={styles.view}>
                            <ImageBackground
                                style={styles.imageWrapper}
                                resizeMode="cover"
                                source={require('../../images/blue-background.png')}
                            >
                                <TouchableOpacity onPress={()=> this.setState({showGallery: true})}>
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
                                        <Icon name="ios-contact" color="white" size={95} />
                                    }
                                </TouchableOpacity>
                            </ImageBackground>
                            <List>
                                <ListItem icon>
                                    <Left>
                                        <Icon style={styles.text} name="ios-contact-outline" size={25} />
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>{user.username}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                        <Icon style={styles.text} name="ios-at-outline" size={25} />
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>{user.email}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                        <Icon style={styles.text} name="ios-call-outline" size={25} />
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>{user.phoneNumber}</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>
                    )
                }
                {
                    <ImageGalleryModal
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
    closeAccountModal: PropTypes.func.isRequired,
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addAvatarURL,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.user,
        firebase: state.firebase,
        avatarURL: state.avatarURL
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountModal);
