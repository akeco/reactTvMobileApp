/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AsyncStorage,
    Platform
} from 'react-native';
import axios from 'axios';
import { Router, Scene, Stack, Lightbox } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/redux/reducers';

var store = createStore(reducers);

import LoginPage from './src/components/LoginScreen';
import RegisterScreen from './src/components/RegisterScreen';
import HomeScreen from './src/components/HomeScreen';
import AuthHoC from './src/components/AuthHoC';
import UserAccount from './src/components/UserAccount';
import SocketConnectionHoC from './src/components/SocketConnectionHoC';

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:3000",
        android: "http://10.0.3.2:3000"
    }) :
    "https://my-production-url.com";


export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        authorized: null
    }
  }

  componentDidMount(){
      AsyncStorage.getItem("quizUser").
      then((user)=>{
          if(user){
              user = JSON.parse(user);
              if(user.id && user.userId){
                  const token = user.id;
                  axios.get(`${SERVER_URL}/api/UserModels/${user.userId}/accessTokens/${token}`)
                      .then((response)=>{
                          console.info("VALID TOKEN", response);
                          if(response.status == 200){
                           //   addUser(response.data);
                              this.setState({
                                  authorized: true
                              });

                              /*
                              if(!authorized){
                                  addLoginUser({
                                      token: response.data.id,
                                      id: response.data.userId
                                  });
                              }
                              this.setState({
                                  logged: true
                              });
                              */
                          }
                      }).catch((error)=>{
                      console.info("ERROR", error);
                      this.setState({
                          authorized: false
                      });
                      /*
                      addLoginUser({
                          token: null
                      });

                      this.setState({
                          logged: false
                      });
                      */
                  });
              }
          }
          else {
              this.setState({
                  authorized: false
              });
          }
      }).catch((err)=>{
          this.setState({
              authorized: false
          });
      });
  }

  renderStructure = () => {
    const {authorized} = this.state;
    if(authorized != null) return (
        <Provider store={store}>
          <Router>
            <Stack key="root">
              <Scene
                  key="rootLogin"
                  initial={authorized === false}
                  navTransparent={true}
                  tabs={true}
                  hideTabBar={true}
              >
                <Scene
                    key="login"
                    component={LoginPage}
                    initial
                    navTransparent={true}
                />
                <Scene
                    key="register"
                    component={RegisterScreen}
                    navTransparent={true}
                />
              </Scene>

              <Lightbox
                  initial={authorized}
                  navTransparent={true}
              >
                <Scene
                    key="content"
                    initial={authorized}
                    navTransparent={true}
                    tabs={true}
                    hideTabBar={true}
                >
                  <Scene
                      key="home"
                      component={SocketConnectionHoC(HomeScreen)}
                      navTransparent={true}
                      initial
                  />
                </Scene>
                <Scene
                    key="userAccount"
                    component={UserAccount}
                />
              </Lightbox>
            </Stack>
          </Router>
        </Provider>
    );
    else return null;
  };

  render(){
    return this.renderStructure()
  }
}
