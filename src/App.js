import { Component } from 'react';
import Layout from './hoc/Layout';
import {Route, Routes, Navigate } from 'react-router-dom';
import Quiz from './containers/Quiz';
import Auth from './containers/Auth';
import QuizList from './containers/QuizList';
import QuizCreator from './containers/QuizCreator';
import { connect } from 'react-redux';
import Logout from './components/Logout';

class App extends Component {
  render () {
    return (
      <Layout>
        <Routes>
          <Route path='/auth' element={this.props.isAuthenticated ? < Navigate to="/quiz-creator"/> : <Auth />} />
          <Route path='/quiz-creator' element={!this.props.isAuthenticated ? <Navigate to="/auth" /> : <QuizCreator />} />
          <Route path='/quiz/:id' element={<Quiz />} />
          <Route path='/' element={<QuizList />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(App);
