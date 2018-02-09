import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    TouchableOpacity,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUser} from '../../redux/actions';
import Icon from 'react-native-vector-icons/Feather';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
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
} from 'native-base';

import styles from './styles';

import Sidebar from '../Sidebar';
import QuestionComponent from '../QuestionComponent';
import ResultsTab from '../ResultsTab';

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
        };
    }

    componentDidMount(){
        const {user, addUser, socket} = this.props;
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

        socket.on("user-already-joined", ()=>{
            alert("USER ALREADY JOINED");
           console.log("USER ALREADY JOINED");
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
            </View>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addUser
    },dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.user,
        socket: state.socket,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);