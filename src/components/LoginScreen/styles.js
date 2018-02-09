import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   view: {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       width: '100%',
       height: '100%',
       paddingLeft: '10%',
       paddingRight: '10%',
   },
    inputText: {
        backgroundColor: 'white',
        width: '100%',
        height: 43,
        fontSize: 14,
        marginBottom: 10,
        paddingLeft: 10,
        borderColor: 'transparent',
    },
    item: {
        borderColor: 'transparent',
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#0096A6'
    },
    registerText: {
        alignSelf: 'flex-start',
        marginTop: 15
    }
});