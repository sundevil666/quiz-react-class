import React  from 'react';
import style from './ActiveQuiz.module.css';
import AnswerList from '../AnswerList';

const ActiveQuiz = props => (
  <div className={style['active-quiz']}>
    <div className={style.question}>
      <div>
        <strong>{ props.answerNumber }. </strong>
        <span>{ props.question }</span>
      </div>
      <small>{ props.answerNumber } из { props.quizLength }</small>
    </div>
    <AnswerList
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
)

export default ActiveQuiz;
