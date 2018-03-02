import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   sidebarWrapper: {
       width: '100%',
       height: '100%',
       backgroundColor: 'white',
       display: 'flex',
   },
    imageWrapper: {
        width: '100%',
        height: 154,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00BBD3'
    },
    account: {
       width: '100%',
        height: 150,
        backgroundColor: '#00BBD3'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e9e8ef',
    },
    buttonConfirm: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#0096A6'
    },
    buttonClose: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#00BBD3',
    },
    buttonText: {
        color: 'white',
    },
    buttonWrapper: {
        width: '100%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    view: {
        width: '100%',
        height: '100%',
    },
    header: {
        backgroundColor: '#00BBD3'
    },
    headerTitle: {
        fontSize: 14,
        color: 'white'
    },
    avatarView: {
        width: 115,
        height: 115,
        borderRadius: 100,
        borderColor: '#00A5B9',
        borderStyle: 'solid',
        borderWidth: 4,
        overflow: 'hidden',
        position: 'relative'
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    imageLoader: {
        backgroundColor: 'rgba(0,150,166,0.8)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'rgba(0,0,0,0.75)'
    },
    leftIcon: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        height: '100%',
        left: 15
    },
    headerBody: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        height: '100%',
        justifyContent: 'center'
    }
});