import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleImageEditor from './components/EditorComponent';
import HTMLConvertExample from './components/DraftedComponents'

class App extends Component {
  render() {
    return (
      <div className="App">
				<HTMLConvertExample />
				<SimpleImageEditor />
      </div>
    );
  }
}

export default App;
