import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    manageJoker
} from '../../redux/actions';
import {
    View,
    Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    Container,
    Button,
    Text,
} from 'native-base';

import styles from './styles';

class ChooseQuestionType extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        };
    }

    handleButtonAnswer = () => {

    };

    renderButtons = () => {
        const {answers} = this.props;
        const {selected} = this.state;
        const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        var ind = 0;
        var formatedAnswers = [];
        answers.forEach((item)=>{
            formatedAnswers.push({
                answer: item,
                index: alpha[ind]
            });
            ind++;
        });

        return formatedAnswers.map((item)=>{
            const disabledBtn = (selected && selected !== item.index) ? true: false;
            const btnStyle = (disabledBtn) ? styles.disabledButtons : styles.buttons;
            return(
                <Button
                    key={item.index}
                    disabled={disabledBtn}
                    block
                    style={btnStyle}
                    onPress={()=>{
                        this.props.answerQuestion(item.index);
                        this.setState({
                            selected: item.index
                        });
                    }}
                >
                    <Text>{item.answer}</Text>
                </Button>
            );
        });
    };

    showJokerButton = () => {
        const {manageJoker} = this.props;
        const {selected} = this.state;
        const disabledBtn = (selected) ? true: false;
        const btnStyle = (selected) ? styles.disabledButtons : styles.jokerButton;

        return (
            <Button
                disabled={disabledBtn}
                block
                iconLeft
                style={btnStyle}
                onPress={()=>{
                    manageJoker(false);
                    this.setState({
                        selected: true
                    });
                }}
            >
                <Icon name='ios-heart' color="white" size={20} />
                <Text>ISKORISTI JOKER</Text>
            </Button>
        )
    };

    render(){
        const {timer} = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.timerWrapper}>
                    <Text>Preostalo vrijeme: {timer}</Text>
                </View>
                {
                    this.renderButtons()
                }
                {
                    this.showJokerButton()
                }
            </View>
        );
    }
}

ChooseQuestionType.propTypes = {
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

export default connect(mapStateToProps, matchDispatchToProps)(ChooseQuestionType);