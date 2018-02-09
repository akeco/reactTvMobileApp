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
    }
});