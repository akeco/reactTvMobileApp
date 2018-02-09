import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    Container,
    Button,
    Body,
    Text,
    Left,
    Right,
    Spinner,
    Toast,
    Root,
    List,
    ListItem,
} from 'native-base';

import styles from './styles';

class ResultsTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: null,
            isDateTimePickerVisible: false,
            pickedDate: moment().format('ll')
        };
    }

    componentDidMount(){
        this.props.fetchData(moment().format('l'), this);
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = (date) => {
        if(date){
            this.setState({
                isDateTimePickerVisible: false,
                pickedDate: moment(date).format("ll")
            });
        }
        else this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.props.fetchData(moment(date).format("ll"), this);
        this.hideDateTimePicker(date);
    };


    renderList = () => {
        const {results} = this.state;

        if(results && results.length){
            const scoresList = [];
            results.forEach((item, index)=>{
                item.scores.forEach((scoreItem, scoreIndex)=>{
                    if(scoreIndex == 0){
                        scoresList.push(
                            <ListItem itemDivider key={item.id}>
                                <Left>
                                    <Text>{index+1}. Pitanje</Text>
                                </Left>
                                <Right>
                                    <Text>Top 30</Text>
                                </Right>
                            </ListItem>,
                            <ListItem key={`${scoreItem.userID}${item.id}`}>
                                <Left>
                                    <Text style={{marginRight: 5}}>{scoreIndex+1}.</Text>
                                    {
                                        (scoreIndex == 0) && <Icon name="ios-star" color="orange" size={20} />
                                    }
                                </Left>
                                <Body>
                                    <Text>{scoreItem.username}</Text>
                                </Body>
                                <Right>
                                    <Text>{scoreItem.score}</Text>
                                </Right>
                            </ListItem>
                        );
                    }
                    else scoresList.push(
                        <ListItem key={`${scoreItem.userID}${item.id}`}>
                            <Left>
                                <Text style={{marginRight: 5}}>{scoreIndex+1}.</Text>
                                {
                                    (scoreIndex == 0) && <Icon name="ios-star" color="orange" size={20} />
                                }
                            </Left>
                            <Body>
                                <Text>{scoreItem.username}</Text>
                            </Body>
                            <Right>
                                <Text>{scoreItem.score}</Text>
                            </Right>
                        </ListItem>
                    )
                });
            });
            if(scoresList.length) return <List>{scoresList}</List>;
            /*
            if(scoresList.length) return (
                <List dataArray={items}>
                    {scoresList}
                <List/>
            );
            */
        }
    };

    render(){
        const { results, pickedDate, isDateTimePickerVisible } = this.state;
        const optionalStyle = (!results) ? styles.emptyWrapper : {};
        return (
            <Root>
                <View style={styles.headerWrapper}>
                    <Left>
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                            <Text style={styles.headerText}>{pickedDate}</Text>
                        </TouchableOpacity>
                    </Left>
                </View>
                <View style={optionalStyle}>
                    {
                        this.renderList()
                    }
                    {
                        !results && <Spinner color='blue' />
                    }
                </View>
                <DateTimePicker
                    isVisible={isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </Root>
        )
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({

    },dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        user: state.user,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ResultsTab);