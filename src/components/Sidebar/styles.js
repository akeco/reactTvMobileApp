import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   sidebarWrapper: {
       width: '100%',
       height: '100%',
       backgroundColor: 'white',
       display: 'flex',
   },
    statusBar: {
        height: 23,
        backgroundColor: '#0096A6'
    },
    account: {
       width: '100%',
        height: 150,
        backgroundColor: '#00BBD3'
    },
    imageWrapper: {
        width: '100%',
        height: 154,
        padding: 20,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e9e8ef',
    },
    innerContainer: {
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
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
    inputText: {
        backgroundColor: 'white',
        width: '100%',
        height: 43,
        marginBottom: 15,
        paddingLeft: 10
    },
    avatarView: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: '#00BBD3',
        borderStyle: 'solid',
        borderWidth: 4,
        overflow: 'hidden'
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
    }
});