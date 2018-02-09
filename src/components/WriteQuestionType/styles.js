import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   wrapper: {
       width: '100%',
       height: '100%',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       paddingLeft: '10%',
       paddingRight: '10%',
       position: 'relative'
   },
    buttons: {
        marginBottom: 15,
        backgroundColor: '#0096A6'
    },
    jokerButton: {
        marginBottom: 15,
        backgroundColor: '#E91E63'
    },
    inputText: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        height: 40,
        marginBottom: 15,
        paddingLeft: 10
    },
    disabledButtons: {
        marginBottom: 15,
        backgroundColor: '#b5b5b5'
    },
    timerWrapper: {
        position: 'absolute',
        top: 30,
    }
});