import React, { Component } from "react";

import { v4 as uuidv4 } from "uuid";
import TodoView from "./components/TodoView";
export default class App extends Component {
  state = {
    todoList: [
      {
        id: uuidv4(),
        todo: "Walk the dog",
      },
      {
        id: uuidv4(),
        todo: "Buy Milk",
      },
      {
        id: uuidv4(),
        todo: "Clean shorts",
      },
    ],
    todoValue: "",
    showErrorMessage: false,
  };

  handleInputChange = (event) => {
    //console.log(event.target.name, event.target.value);

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let newTodoObj = {
      id: uuidv4(),
      todo: this.state.todoValue,
    };

    let newArray = [...this.state.todoList, newTodoObj];
    // let newArray = [...this.state.todoList];
    // newArray.push(newTodoObj);

    this.setState({
      todoList: newArray,
      todoValue: "",
    });
  };

  // showTodoList = () => {
  //   return this.state.todoList.map(({ id, todo }) => {
  //     return <li key={id}>{todo}</li>;
  //   });
  // };

  addFunc = () => {
    console.log("Add Func");
  };

  render() {
    const { todoList, showErrorMessage } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {showErrorMessage ? <div>Please, enter something todo!</div> : null}
        <input
          onChange={this.handleInputChange}
          style={{ marginTop: 20 }}
          type="text"
          name="todoValue"
          value={this.state.todoValue}
        />{" "}
        <button onClick={this.handleSubmit}>Add</button>
        {/* <ul>{this.showTodoList()}</ul> */}
        {/* <ul style={{ listStyle: "none" }}>
          {this.state.todoList.map(({ id, todo }) => {
            return <li key={id}>{todo}</li>;
          })}
        </ul> */}
        <TodoView
          todoList={todoList}
          nameString={"Hamster"}
          age={123}
          arrayObject={[1, 2, 3]}
          trueOrFalse={false}
          addFunc={this.addFunc}
          obj={{ 1: 1, 2: 2, 3: 3 }}
        />
      </div>
    );
  }
}
