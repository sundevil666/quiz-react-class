import React from 'react';
import style from './FinishedQuiz.module.css';
import Button from '../UI/button';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)
  return (
    <div className={style.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {

          return (
            <li key={index} className={style[props.results[quizItem.id]]}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
            </li>
          )
        })}
      </ul>

      <div>Правильно { successCount } из { props.quiz.length }</div>
      <div className={style.flex}>
        <Button onClick={props.onRetry} type="primary">Повторить</Button>
        <Link to='/'>
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz;
