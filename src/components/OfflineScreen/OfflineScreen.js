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

const OfflineScreen = () => {

  return(
        <View style={styles.content}>
            <StatusBar
                barStyle="light-content"
            />
            <View style={styles.statusBar} />
            <View style={styles.mainWrapper}>
                <Text>Offline</Text>
            </View>
        </View>
    );
};

export default connect(function (state) {
    return {
        user: state.user
    }
})(OfflineScreen);


