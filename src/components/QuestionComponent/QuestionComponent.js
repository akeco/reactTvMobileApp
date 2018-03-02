import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {
    addAnswersStack,
    addToScore
} from '../../redux/actions';

import Icon from 'react-native-vector-icons/Ionicons';

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
    Spinner,
    Toast,
    Root
} from 'native-base';

import styles from './styles';

import ChooseQuestionType from '../ChooseQuestionType';
import WriteQuestionType from '../WriteQuestionType';

class QuestionComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionType: null,
            rightAnswer: null,
            time: null,
            answered: null,
            infoText: null,
            answers: [],
            timer: 10,
            tempScore: 0,
            showSimilarity: false,
            similarPercent: null,
            success: false
        };
        this.scoreIncreaseBy = 0.03;
    }

    componentDidMount(){
        const {socket} = this.props;
        socket.on("receive-question", this.receiveQuestion);
    }

    similarity = (s1, s2) => {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    };

    editDistance = (s1, s2) => {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    };


    answerQuestion = (data) => {
        const {socket, user, addAnswersStack, answersStack, usedJokers, jokers} = this.props,
            {rightAnswer, questionType} = this.state;

        if(questionType === "write"){
            const timeDiff = new Date(new Date().getTime() - this.state.time);
            const similarPercent = this.similarity(rightAnswer, data);

            /* APPEND NEW ANSWER TO BOOLEAN ANSWERS STACK */
            addAnswersStack(similarPercent >= 0.5);

            var infoText = null;
            const time = timeDiff.getSeconds();
            if(data && data !== 'joker' && similarPercent >= 0.5){
                if(time > 0 && time <= 3) infoText = "Odlično, vaš odgovor je tačan. Brzo ste odgovorili.";
                else if(time > 3 && time <= 6 ) infoText = "Bravo, tačan odgovor, ovo je baš bilo lako zar ne.";
                else infoText = "Tačan odgovor.";

                var multiplyBy = 1;
                if(answersStack.length && answersStack[answersStack.length-1]){
                    var value = ((answersStack.length) * this.scoreIncreaseBy);
                    if(value > 1) value = value / 10;
                    multiplyBy = value + 1;
                }

                const sec = `${timeDiff.getSeconds()}.${( '' + timeDiff.getMilliseconds())[0]}`;
                this.setState({
                    tempScore: parseInt(parseInt(Math.log(10/sec)*1000) * multiplyBy * similarPercent),
                    success: true
                });

                const results = {
                    user: JSON.stringify({
                        userId: user.userId,
                        username: user.username
                    }),
                    //score: parseInt(parseInt(Math.log(10/sec)*1000) * multiplyBy * similarPercent) + this.props.score
                    score: parseInt(parseInt(Math.log(10/sec)*1000) * multiplyBy * similarPercent)
                };
                socket.emit("send-answer", results);
            }
            else if(data && data !== 'joker' && similarPercent < 0.5) {
                if(time > 0 && time <= 3) infoText = "Žao nam je, odgovor nije tačan. Požurili ste.";
                else if(time > 3 && time <= 6 ) infoText = "Odgovor je netačan, budite oprezni i dobro poslušajte pjesme.";
                else infoText = "Netačan odgovor.";
            }

            this.setState({
                answered: data,
                infoText,
                similarPercent: similarPercent*100
            });

        }
        else {
            const timeDiff = new Date(new Date().getTime() - this.state.time);

            /* APPEND NEW ANSWER TO BOOLEAN ANSWERS STACK */
            addAnswersStack(data === rightAnswer);

            var infoText = null;
            const time = timeDiff.getSeconds();
            if(data && data !== 'joker' && data == rightAnswer){
                if(time > 0 && time <= 3) infoText = "Odlično, vaš odgovor je tačan. Brzo ste odgovorili.";
                else if(time > 3 && time <= 6 ) infoText = "Bravo, tačan odgovor, ovo je baš bilo lako zar ne.";
                else infoText = "Tačan odgovor.";

                var multiplyBy = 1;
                if(answersStack.length && answersStack[answersStack.length-1]){
                    var value = ((answersStack.length) * this.scoreIncreaseBy);
                    if(value > 1) value = value / 10;
                    multiplyBy = value + 1;
                }

                const sec = `${timeDiff.getSeconds()}.${( '' + timeDiff.getMilliseconds())[0]}`;
                this.setState({
                    tempScore: parseInt(parseInt(Math.log(10/sec)*1000) * multiplyBy),
                    success: true
                });

                const results = {
                    user: JSON.stringify({
                        userId: user.userId,
                        username: user.username
                    }),
                    //score: parseInt(parseInt(Math.log(10/sec)*1000) * multiplyBy) + this.props.score
                    score: parseInt(parseInt(Math.log(10/sec)*1000) * multiplyBy)
                };
                socket.emit("send-answer", results);

            }
            else if(data && data !== 'joker' && data != rightAnswer) {
                if(time > 0 && time <= 3) infoText = "Žao nam je, odgovor nije tačan. Požurili ste.";
                else if(time > 3 && time <= 6 ) infoText = "Odgovor je netačan, budite oprezni i dobro poslušajte pjesme.";
                else infoText = "Netačan odgovor.";
            }
            else if(data && data === 'joker') {
                infoText = `Iskoristili ste joker. Preostalo vam je još ${usedJokers} za danas!`;
            }

            this.setState({
                answered: data,
                infoText
            });
        }
    };

    receiveQuestion = (data) => {
        const { addAnswersStack, addToScore, socket, user } = this.props;
        const result = JSON.parse(data);

        this.setState({
            questionType: result.questionType,
            rightAnswer: result.rightAnswer,
            time: result.time,
            answers: result.answers && [...result.answers] || []
        });

        this.timerInterval = setInterval(()=>{
            this.setState({
                timer: this.state.timer-1
            })
        }, 1000);

        setTimeout(()=>{
            clearInterval(this.timerInterval);

            Toast.show({
                text: this.state.infoText || 'Propustili ste pitanje. Nažalost zavržili ste igru za danas.',
                position: 'bottom',
                duration: 3000,
                type: (this.state.success || this.state.answered === 'joker') ? 'success' : 'danger'
            });

            setTimeout(()=> {
                var message = '';
                var counter = 0;
                this.props.answersStack.forEach((item)=>{
                    if(item) counter++;
                    else counter = 0;
                });

                this.setState({
                    showSimilarity: false,
                    similarPercent: null
                });

                switch(counter){
                    case 3: message = "Izvrsno, već tri tačna odgovora u nizu!";
                        break;
                    case 5: message = "Odlicno, već pet tačnih odgovora u nizu!";
                        break;
                    case 10: message = "Genijalno, deset tačnih odgovora u nizu!";
                        break;
                    case 15: message = "Fenomenalno, petnaest tačnih odgovora u nizu, još samo malo!";
                        break;
                    case 20: message = "Čestitamo, svih 20 tačnih odgovora u nizu!";
                        break;
                }
                if(this.state.answered !== 'joker' && counter == 3 || counter == 5 || counter == 10 || counter == 15 || counter == 20){
                    Toast.show({
                        text: message,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            }, 4000);

            //if(!this.state.answered) addAnswersStack(false);
            if(this.state.tempScore) addToScore(this.state.tempScore);
            if(this.state.answered !== 'joker' && !this.state.success) {
                socket.emit("disable-user", user.userId);
            }

            this.setState({
                questionType: null,
                rightAnswer: null,
                time: null,
                answered: null,
                infoText: null,
                timer: 10,
                tempScore: 0,
                success: false,
                showSimilarity: this.state.answered && this.state.similarPercent && true
            });
        }, 10000);
    };

    renderQuestionType(){
        const {questionType} = this.state;

        if(questionType === "choose"){
            return <ChooseQuestionType {...this.state} answerQuestion={this.answerQuestion} />
        }
        else if(questionType === "write"){
            return <WriteQuestionType {...this.state} answerQuestion={this.answerQuestion} />
        }
        else return <View style={styles.loaderWrapper}><Spinner color='blue' /></View>
    }

    render(){
        const {score, jokers} = this.props;
        const {showSimilarity, similarPercent} = this.state;
        return (
            <Container>
                <View style={styles.scoreWrapper}>
                    <Left>
                        <Text style={styles.scoreText}>Bodovi: {score}</Text>
                    </Left>
                    {showSimilarity && (
                        <Right>
                            <Text style={styles.scoreText}>Tačnost: {similarPercent}%</Text>
                        </Right>
                    )}

                    <Right>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Icon name='ios-heart' color="white" size={18} />
                            <Text style={[styles.scoreText, {marginLeft:5}]}>{jokers}</Text>
                        </View>
                    </Right>
                </View>
                {this.renderQuestionType()}
            </Container>
        )
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addAnswersStack,
        addToScore
    },dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        user: state.user,
        answersStack: state.answersStack,
        score: state.score,
        jokers: state.jokers,
        usedJokers: state.usedJokers,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(QuestionComponent);