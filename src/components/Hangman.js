import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

import step0 from './images/Untitled.png';
import step1 from './images/Untitled1.png';
import step2 from './images/Untitled2.png';
import step3 from './images/Untitled3.png';
import step4 from './images/Untitled4.png';
import step5 from './images/Untitled5.png';
import step6 from './images/Untitled6.png';
import step7 from './images/Untitled7.png';


class Hangman extends Component {
    static defaultProps = {
        maxWrong: 7,
        images: [step0, step1, step2, step3, step4, step5, step6, step7]
    }

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0, 
            guessed: new Set([]),
            answer: randomWord()
        }
    }

    handleGuess = e => {
        let letter = e.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
    }

    guessWord() {
        return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter: " _ "));
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button class="btn btn-danger m-2"
                key={letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}>
                {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            mistake: 0,
            guessed: new Set(),
            answer: randomWord()
        })
    }

    render(){
        const gameover = this.state.mistake >= this.props.maxWrong;
        const isWinner = this.guessWord().join("") === this.state.answer;
        let gameStat = this.generateButtons();

        if(isWinner) {
            gameStat = "You WON!!!";
        }
        if(gameover) {
            gameStat = "You LOST!";
        }

        return (
            <div className="Hangman container"> 
                <h1 className="text-center">Hangman</h1>
                <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
                <div className="text-center">
                    <img src={this.props.images[this.state.mistake]} alt=""/>
                </div>
                <div className="text-center">
                    <p>Guess the Word!</p>
                    <p>
                        {!gameover ? this.guessWord() : this.state.answer}
                    </p>
                    <p>{gameStat}</p>
                    <button className="btn btn-dark" onClick={this.resetButton}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Hangman;