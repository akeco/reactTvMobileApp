import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    statusBar: {
        height: 23,
        backgroundColor: '#0096A6'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#0096A6',
        marginTop: 20
    },
    mainWrapper: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00BBD3',
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    innerContainer: {
        alignItems: 'center',
    },
    messageText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    smallText: {
        color: 'rgba(255,255,255,0.95)',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 25
    },
    username: {
        fontWeight:'bold',
        color: 'white'
    },
    content: {
        width: '100%',
        height: '100%'
    }
});