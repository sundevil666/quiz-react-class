import React, { Component } from 'react';
import style from './QuizCreator.module.css';
import Button from '../../components/UI/button';
import { createControl, validate, validateForm } from '../../components/form/formFramework';
import Input from '../../components/UI/Input';
import Auxiliary from '../../hoc/Auxiliary';
import Select from '../../components/UI/Select';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

function createOptionControl(number) {
  return createControl(
    {label: `Enter option ${number}`, errorMessage: 'Input is not empty', id: number},
    {required: true}
  )
}

function createFormControls () {
  return {
    question: createControl(
      {label: 'Enter question', errorMessage: 'Input is not empty'},
      {required: true}
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {

  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls(),
  }

  submitHandler = e => {
    e.preventDefault()
  }
  addQuestionHandler = e => {
    e.preventDefault()
    const { question, option1, option2, option3, option4 } = this.state.formControls

    const questionItem = {
      question: question.value,
      id: this.props.quiz?.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answer: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }
    this.props.createQuizQuestion(questionItem)
    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls(),
    })
  }

  createQuizHandler = event => {
    event.preventDefault()
      this.setState({
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls(),
      })
    this.props.finishCreateQuiz()
  }
  changeHandler(val, controlName) {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}
    control.touched = true
    control.value = val
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control
    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }
  renderInputsControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Auxiliary key={control.label + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMassage={control.errorMessage}
            onChange={evt => this.changeHandler(evt.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Auxiliary>
      )
    })
  }
  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: Number(event.target.value)
    })
  }
  render () {
    return (
      <div className={style.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>
          <form onSubmit={this.submitHandler}>
            { this.renderInputsControls()}

            <Select
              label="Insert right answer"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
              ]}
            />
            <Button type="primary" onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}>Add Quiz</Button>
            <Button type="success" onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0}>Create Quiz</Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
