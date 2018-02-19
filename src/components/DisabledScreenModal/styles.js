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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00BBD3',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    messageText: {
        color: 'white',
        paddingLeft: '15%',
        paddingRight: '15%',
        textAlign: 'center',
        fontSize: 18
    },
    smallText: {
        color: 'rgba(255,255,255,0.9)',
        paddingLeft: '15%',
        paddingRight: '15%',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 15
    },
    username: {
        fontWeight:'bold',
        color: 'white'
    }
});