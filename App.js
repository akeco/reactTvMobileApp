/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AsyncStorage,
    Platform,
    NetInfo,
    View
} from 'react-native';
import {
    Root,
    Container,
    Toast
} from 'native-base';
import axios from 'axios';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from './src/redux/reducers';

var createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);

import LoginPage from './src/components/LoginScreen';
import RegisterScreen from './src/components/RegisterScreen';
import RegisterScreenDetails from './src/components/RegisterScreenDetails';
import HomeScreen from './src/components/HomeScreen';
import SocketConnectionHoC from './src/components/SocketConnectionHoC';
import EmailVerifyScreen from './src/components/EmailVerifyScreen';

const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "https://quizapp-api.herokuapp.com",
        android: "https://quizapp-api.herokuapp.com"
    }) :
    "https://quizapp-api.herokuapp.com";


export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        authorized: null,
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
                              this.setState({
                                  authorized: true
                              });
                          }
                      }).catch((error)=>{
                      console.info("ERROR", error);
                      this.setState({
                          authorized: false
                      });
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
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Root>
                <Container>
                  <Router>
                    <Stack key="root">
                      <Scene
                          key="rootLogin"
                          initial={authorized === false}
                          tabs={true}
                          navTransparent={false}
                          hideTabBar={true}
                      >
                        <Scene
                            key="login"
                            component={LoginPage}
                            initial
                            title="PRIJAVA"
                            navTransparent={false}
                            hideTabBar={true}
                            navigationBarStyle={{backgroundColor:'#00BBD3'}}
                            titleStyle={{
                                color: 'white',
                                alignSelf: 'center',
                                fontWeight:"500",
                                fontSize: 14
                            }}
                        />
                        <Scene
                            key="register"
                            component={RegisterScreen}
                            title="REGISTRACIJA"
                            navTransparent={false}
                            hideTabBar={true}
                            back={true}
                            backButtonTintColor="white"
                            navigationBarStyle={{backgroundColor:'#00BBD3', position: 'relative'}}
                            titleStyle={{
                                color: 'white',
                                alignSelf: 'center',
                                fontWeight:"500",
                                fontSize: 14,
                                position: 'relative',
                            }}
                        />
                          <Scene
                              key="register-details"
                              component={RegisterScreenDetails}
                              title="REGISTRACIJA"
                              navTransparent={false}
                              hideTabBar={true}
                              back={true}
                              onBack={()=>{
                                  Actions.push("register")
                              }}
                              backButtonTintColor="white"
                              navigationBarStyle={{backgroundColor:'#00BBD3', position: 'relative'}}
                              titleStyle={{
                                  color: 'white',
                                  alignSelf: 'center',
                                  fontWeight:"500",
                                  fontSize: 14,
                                  position: 'relative',
                              }}
                          />
                      </Scene>

                        <Scene
                            key="content"
                            initial={authorized}
                            navTransparent={true}
                            tabs={true}
                            hideTabBar={true}
                            navigationBarStyle={{display: 'none'}}
                        >
                            <Scene
                                key="home"
                                component={SocketConnectionHoC(HomeScreen)}
                                navTransparent={false}
                                hideTabBar={true}
                                initial

                            />
                            <Scene
                                key="emailVerifyScreen"
                                component={EmailVerifyScreen}
                                navTransparent={true}
                                hideTabBar={true}
                            />
                        </Scene>
                    </Stack>
                  </Router>
                </Container>
            </Root>
        </Provider>
    );
    else return null;
  };

  render(){
    return this.renderStructure()
  }
}
