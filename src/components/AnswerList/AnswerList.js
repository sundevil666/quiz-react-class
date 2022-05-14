import React from 'react';
import style from './AnswerList.module.css';
import AnswerItem from '../AnswerItem';

const AnswerList = props => {
  return (
    <ul className={style.AnswerList}>
      { props.answers.map((answer, index) => {
        return (
          <AnswerItem
            answer={answer}
            key={index}
            onAnswerClick={props.onAnswerClick}
            state={props.state ? props.state[answer.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default AnswerList;
