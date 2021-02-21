import React, { Component } from 'react';
import './App.css';

const data = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];

const dataToSort = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      message2: '',
      binaryAttempts: 0
    }
  }

  binarySearch = (input, data, start, end) => {
    let sortedData = data.sort(function(a, b) {
      return a - b;
    });
    let startIndex = start === undefined ? 0 : start;
    let endIndex = end === undefined ? sortedData.length : end;

    if (start > end) {
      return `After ${this.state.binaryAttempts} attempts, the Binary Search could not find ${input}`
    }

    const updatedBinaryAttempts = this.state.binaryAttempts + 1;

    this.setState({
      binaryAttempts: updatedBinaryAttempts
    })

    // find the middle index between the start and end
    const index = Math.floor((startIndex + endIndex) / 2);
    // find the item in the dataset
    const item = sortedData[index];
    console.log('startIndex', startIndex, 'endIndex', endIndex);

    if (item === parseInt(input)) {
      return `The Binary Search Algorithm found ${input} after ${this.state.binaryAttempts} attempts.`
    }
    else if (item < parseInt(input)) {
      return this.binarySearch(input, sortedData, index + 1, endIndex);
    }
    else if (item > parseInt(input)) {
      return this.binarySearch(input, sortedData, startIndex, index - 1);
    }
  }

  linearSearch = (input, data) => {
    console.log('unsortedData', data);
    let attempts = 0;
    for (let i = 0; i < data.length; i++) {
      if (parseInt(input) === data[i]) {
        attempts++;
        return `The Linear Search algorithm found ${input} after ${attempts} attempts.`;
      }
      else {
        attempts++;
      }
    }
    return `After ${attempts} attempts, the Linear Search was unable to find ${input} in our data.`
  }
  
  runSearch = (event) => {
    event.preventDefault();
    const value = event.target.number.value;
    
    this.setState({
      message: this.linearSearch(value, data)
    })
    this.setState({
      message2: this.binarySearch(value, dataToSort)
    })
  }
  
  render() {
    return (
      <div className="App">
        <form onSubmit={(e) => this.runSearch(e)}>
          <label>Number:</label>
          <input name="number" id="number" type="number"/>
          <button type="submit">Submit</button>
        </form>
        {this.state.message 
        ? <p>{this.state.message}</p>
        : <></>}
        {this.state.message2 
        ? <p>{this.state.message2}</p>
        : <></>}
      </div>
    );
  }
}

export default App;
