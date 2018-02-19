import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    TouchableOpacity,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    addUser,
    addSocket,
    addFirebase
} from '../../redux/actions';
import Icon from 'react-native-vector-icons/Feather';
import firebase from 'firebase';
//import firebase from 'react-native-firebase';
import axios from 'axios';
import {
    API_KEY as apiKey,
    AUTH_DOMAIN as authDomain,
    DATABASE_URL as databaseURL,
    PROJECT_ID as projectId,
    STORAGE_BUCKET as storageBucket,
    MESSAGING_SENDER_ID as messagingSenderId
} from 'react-native-dotenv'
import {
    Drawer,
    Container,
    Button,
    Header,
    Text,
    Tab,
    Tabs,
    TabHeading,
    Left,
    Right,
    Toast
} from 'native-base';

import styles from './styles';

import Sidebar from '../Sidebar';
import QuestionComponent from '../QuestionComponent';
import ResultsTab from '../ResultsTab';
import DisabledScreenModal from '../DisabledScreenModal';

/*
const iosConfig = {
    clientId: '290512193072-vg823933lls7eit7rj0gv4lc5kvoh73t.apps.googleusercontent.com',
    appId: '1:290512193072:ios:ae30f100993e5d6b',
    apiKey: 'AIzaSyCFlvDXMTIao2Uf5z3OtenijsQur1z51aE',
    databaseURL: 'https://quizapp-8fc94.firebaseio.com',
    storageBucket: 'quizapp-8fc94.appspot.com',
    messagingSenderId: '290512193072',
    projectId: 'quizapp-8fc94',

    // enable persistence by adding the below flag
    persistence: true,
};

// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
    clientId: '290512193072-v3cahkqjl2481hp37bkick4nmlmkfadh.apps.googleusercontent.com',
    appId: 'x',
    apiKey: 'AIzaSyDT4O6hIrswbDYqc20KDt7k-9T5w8naPxA',
    databaseURL: 'https://quizapp-8fc94.firebaseio.com',
    storageBucket: 'quizapp-8fc94.appspot.com',
    messagingSenderId: 'x',
    projectId: 'quizapp-8fc94',

    // enable persistence by adding the below flag
    persistence: true,
    debug: true
};
*/

var config = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId
};

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:3000",
        android: "http://10.0.3.2:3000"
    }) :
    "https://my-production-url.com";

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            sidebarOpen: false,
            disabledScreen: false
        };
    }

    componentDidMount(){
        const {user, addUser, socket, addFirebase, firebaseReducer } = this.props;
        if(!user){
            AsyncStorage.getItem("quizUser").then((user)=>{
                if(user){
                    user = JSON.parse(user);
                    if(user.id && user.userId){
                        addUser(user);
                        socket.emit("join-room", user.userId);
                    }
                }
            }).catch((err)=>{
                console.info("Save user to reducer error", err);
            });
        }

        if(!firebaseReducer){
            //firebase.app('quizTVApp');
            //addFirebase(firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig, 'quizTVApp'));
            firebase.initializeApp(config);
            addFirebase(firebase);
        }

        socket.on("user-already-joined", ()=>{
            this.setState({
                disabledScreen: true
            });
        });

        socket.on("joined-available-users-room", ()=>{
            Toast.show({
                text: 'Uspješno ste prijavljeni u igru. Molmo slušajte pitanja pažljivo!',
                position: 'bottom',
                duration: 4000,
            });
        });
    }

    fetchData = (date = moment().format('l'), self) => {
        axios.get(`${SERVER_URL}/api/questionResults?filter[where][date]=${date}&[order]=createdDate&[limit]=30`).then((response)=>{
            if(response.status == 200){
                console.info("RESP", response);
                self.setState({
                    results: response.data
                })
            }
        }).catch((error)=>{
            console.info("ERROR", error);
        });
    };

    closeDrawer = () => {
        this.setState({
            sidebarOpen: false
        }, this.drawer._root.close);
    };

    openDrawer = () => {
        this.setState({
            sidebarOpen: true
        }, this.drawer._root.open);
    };

    handleSidebarToggle = () => {
        const {sidebarOpen} = this.state;
        if(!sidebarOpen)  this.openDrawer();
        else this.closeDrawer();
    };

    fetchResults = (event) => {
        if(event.i == 1){
            console.info("RESULTS");
        }
    };

    render(){
        const {user} = this.props;
        return (
            <View style={styles.wrapper}>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<Sidebar/>}
                    onClose={() => this.closeDrawer()}
                >
                    <Container>
                        <View style={styles.headerWrapper}>
                            <Header
                                style={styles.header}
                                iosBarStyle="light-content"
                                hasTabs>
                                <View style={styles.buttonWrapper}>
                                    <TouchableOpacity onPress={this.handleSidebarToggle}>
                                        <Icon name='menu' size={25} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </Header>
                        </View>
                        <Tabs
                            tabBarUnderlineStyle={{backgroundColor: '#fff'}}
                            onChangeTab={this.fetchResults}
                        >
                            <Tab
                                heading="Pitanja"
                                tabStyle={styles.tab}
                                textStyle={{color: '#fff'}}
                                activeTabStyle={styles.tab}
                                activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
                            >
                                <QuestionComponent/>
                            </Tab>
                            <Tab
                                heading="Rezultati"
                                tabStyle={styles.tab}
                                textStyle={{color: '#fff'}}
                                activeTabStyle={styles.tab}
                                activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
                            >
                                <ResultsTab fetchData={this.fetchData}/>
                            </Tab>
                        </Tabs>
                    </Container>
                </Drawer>
                <DisabledScreenModal
                    disabledScreen={this.state.disabledScreen}
                    user={user}
                />
            </View>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addUser,
        addSocket,
        addFirebase
    },dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.user,
        socket: state.socket,
        firebaseReducer: state.firebase,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);