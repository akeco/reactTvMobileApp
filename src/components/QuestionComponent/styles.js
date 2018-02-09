import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   wrapper: {
       width: '100%',
       height: '100%',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       paddingLeft: '10%',
       paddingRight: '10%'
   },
    buttons: {
       marginBottom: 15
    },
    loaderWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreWrapper: {
        backgroundColor: '#0096A6',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    scoreText: {
       color: 'white'
    }
});