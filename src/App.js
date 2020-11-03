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
    showNoTodosMessage: false,
  };

  handleInputChange = (event) => {
    //console.log(event.target.name, event.target.value);

    if (this.state.showErrorMessage) {
      this.setState({
        showErrorMessage: false,
      });
    }

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.todoValue.length === 0) {
      this.setState({
        showErrorMessage: true,
      });
      return;
    }

    let newTodoObj = {
      id: uuidv4(),
      todo: this.state.todoValue,
    };

    let newArray = [...this.state.todoList, newTodoObj];
    // let newArray = [...this.state.todoList];
    // newArray.push(newTodoObj);

    this.setState(
      {
        todoList: newArray,
        todoValue: "",
      },
      () => {
        if (this.state.todoList.length > 0) {
          this.setState({
            showNoTodosMessage: false,
          });
        }
      }
    );
  };

  // showTodoList = () => {
  //   return this.state.todoList.map(({ id, todo }) => {
  //     return <li key={id}>{todo}</li>;
  //   });
  // };

  addFunc = () => {
    console.log("Add Func");
  };

  appHandleDeleteTodo = (targetID) => {
    //console.log("ID: ", id);

    let copiedArray = [...this.state.todoList];

    let filteredArray = copiedArray.filter(({ id }) => {
      return id !== targetID;
    });

    this.setState(
      {
        todoList: filteredArray,
      },
      () => {
        // console.log("-----" + "inside setState");
        if (this.state.todoList.length === 0) {
          this.setState({
            showNoTodosMessage: true,
          });
        }
      }
    );
    // console.log("outside setSTate");
    // if (this.state.todoList.length === 0) {
    //   this.setState({
    //     showNoTodosMessage: true,
    //   });
    // }
  };

  render() {
    const { todoList, showErrorMessage, showNoTodosMessage } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {showErrorMessage ? (
          <div style={{ color: "red", marginTop: 10 }}>
            Please, enter something todo!
          </div>
        ) : null}
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
        {showNoTodosMessage ? (
          <div style={{ marginTop: 10, color: "blue" }}>
            Please add something to do!
          </div>
        ) : (
          <TodoView
            todoList={todoList}
            appHandleDeleteTodo={this.appHandleDeleteTodo}
            // nameString={"Hamster"}
            // age={123}
            // arrayObject={[1, 2, 3]}
            // trueOrFalse={false}
            // addFunc={this.addFunc}
            // obj={{ 1: 1, 2: 2, 3: 3 }}
          />
        )}
      </div>
    );
  }
}
