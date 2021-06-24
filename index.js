import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './api.js'
import Container from './componentes/container/index.js'



  class Main extends React.Component {

    render() {
      return (
            <Container/>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
   