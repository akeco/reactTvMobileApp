import React, {Component} from 'react';
import {
    View,
    AsyncStorage
} from 'react-native';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {addUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default (CustomComponent) => {
    return connect(mapStateToProps, matchDispatchToProps)(class AuthHoC extends Component {
        constructor(props){
            super(props);
            this.state = {
                authorized: null
            }
        }

        componentDidMount(){
            const {addUser, socket} = this.props;
            AsyncStorage.getItem("quizUser").
                then((user)=>{
                    if(user){
                        user = JSON.parse(user);
                        if(user.id && user.userId){
                            const token = user.id;
                            axios.get(`http://localhost:3000/api/Users/${user.userId}/accessTokens/${token}`)
                                .then((response)=>{
                                    console.info("VALID TOKEN", response);
                                    if(response.status == 200){
                                        addUser(response.data);
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

        authRedirect = () => {
          const {authorized} = this.state;
          console.info("AUTH", authorized);
          if(authorized) {
              Actions.push("content");
              return null;
          }
          else if(authorized === false) return <CustomComponent/>;
          else return null;
        };

        render(){
            return (
                this.authRedirect()
            );
        }
    });
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addUser
    },dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket
    }
}