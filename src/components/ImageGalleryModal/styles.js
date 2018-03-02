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
    inputText: {
        backgroundColor: 'white',
        width: '100%',
        height: 43,
        marginBottom: 15,
        paddingLeft: 10
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
    modalPrompt: {
        backgroundColor: 'white',
        borderRadius: 3
    },
    modalTitle: {
        padding: 10,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1
    },
    titleText: {
       fontSize: 20
    },
    modalBody: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    discardButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        marginRight: 5
    },
    confirmButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        marginLeft: 5,
        backgroundColor: '#0096A6'
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