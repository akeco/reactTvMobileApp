import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   view: {
       display: 'flex',
       //justifyContent: 'center',
      // alignItems: 'center',
       paddingTop: 30,
       width: '100%',
       height: '100%',
       backgroundColor: 'white'
   },
    inputText: {
       backgroundColor: 'white',
        width: '80%',
        height: 40,
        marginBottom: 15,
        paddingLeft: 10
    },
    button: {
        width: '80%',
        alignSelf: 'center'
    },
    registerText: {
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: 15
    }
});