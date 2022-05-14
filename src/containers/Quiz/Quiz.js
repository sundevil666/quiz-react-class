import React, { Component } from 'react';
import style from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import Loader from '../../components/UI/Loader';
import { connect } from 'react-redux';
import { fetchQuizesById, fetchAnswerClick, retryQuiz } from '../../store/actions/quiz'

class Quiz extends Component {
  componentDidMount () {
    const pageId = window.location.href.split('/').pop()
    this.props.fetchQuizById(pageId)
  }
  componentWillUnmount () {
    this.props.retryQuiz()
  }

  render () {
    return (
      <div className={style.quiz}>
        <div className={style['quiz-wrapper']}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.props.loading || !this.props.quiz
            ? <Loader />
            : this.props.isFinished
                ? <FinishedQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetry={this.props.retryQuiz}
                />
                : <ActiveQuiz
                  question={this.props.quiz[this.props.activeQuestion].question}
                  answers={this.props.quiz[this.props.activeQuestion].answer}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizesById(id)),
    quizAnswerClick: answerId => dispatch(fetchAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
