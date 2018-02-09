import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    manageJoker
} from '../../redux/actions';
import {
    View,
    TextInput,
    Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    Container,
    Button,
    Header,
    Text,
} from 'native-base';

import styles from './styles';

class WriteQuestionType extends Component {
    constructor(props){
        super(props);
        this.state = {
            answer: '',
            clicked: false
        }
    }

    handleButtonAnswer = () => {
        const {answerQuestion} = this.props,
            {answer} = this.state;
        if(answer.length){
            answerQuestion(answer);
            this.setState({
                clicked: true
            })
        }
    };

    showJokerButton = () => {
        const {manageJoker} = this.props;
        const {clicked} = this.state;
        const btnStyle = (clicked) ? styles.disabledButtons : styles.jokerButton;

        return (
            <Button
                disabled={clicked}
                block
                iconLeft
                style={btnStyle}
                onPress={()=>{
                    manageJoker(false);
                    this.setState({
                        clicked: true
                    });
                }}
            >
                <Icon name='ios-heart' color="white" size={20} />
                <Text>ISKORISTI JOKER</Text>
            </Button>
        )
    };

    render(){
        const {answer, clicked} = this.state;
        const {timer} = this.props;
        const btnStyle = (clicked) ? styles.disabledButtons : styles.buttons;

        return (
            <View style={styles.wrapper}>
                <View style={styles.timerWrapper}>
                    <Text>Preostalo vrijeme: {timer}</Text>
                </View>
                <TextInput
                    placeholder="Unesi odgovor"
                    autoFocus={true}
                    value={answer}
                    editable={!clicked}
                    style={styles.inputText}
                    onChangeText={(answer) => {
                        this.setState({
                            answer
                        })
                    }}
                />
                <Button primary block
                        style={btnStyle}
                        disabled={clicked}
                        onPress={this.handleButtonAnswer}
                >
                    <Text>POTVRDI ODGOVOR</Text>
                </Button>
                {
                    this.showJokerButton()
                }
            </View>
        );
    }
}

WriteQuestionType.propTypes = {
    answerQuestion: PropTypes.func.isRequired,
    rightAnswer: PropTypes.any,
    timer: PropTypes.number.isRequired
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        manageJoker
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(WriteQuestionType);