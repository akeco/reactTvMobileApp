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
        marginTop: 10,
        backgroundColor: '#0096A6'
    },
    radioView: {
        display: 'flex',
        width: '100%',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },
    listItem: {
       borderColor: 'transparent',
    },
    radioListItem: {
        marginLeft: 0,
        borderColor: 'transparent'
    },
    registerText: {
        alignSelf: 'flex-start',
        marginTop: 15
    },
    right: {
        flexGrow: 1
    }
});