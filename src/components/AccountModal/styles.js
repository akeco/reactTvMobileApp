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
    statusBar: {
        height: 23,
        backgroundColor: '#0096A6'
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
        backgroundColor: '#00BBD3',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 20
    },
    avatarView: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 3,
        overflow: 'hidden'
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    }
});