import React from "react";
import { arrayOf, shape, number, string } from "prop-types";

import "./TodoView.css";

const TodoView = ({ todoList, appHandleDeleteTodo }) => {
  //console.log(todoList);

  const todoViewHandleDeleteButton = (id) => {
    //console.log("ID: ", id);
    appHandleDeleteTodo(id);
  };

  return (
    <ul style={{ listStyle: "none" }}>
      {todoList.map(({ id, todo }) => {
        return (
          <li key={id} style={{ margin: 20 }}>
            {todo}{" "}
            <span className="todo-button-shared-style edit-button">Edit</span>
            <span
              onClick={() => todoViewHandleDeleteButton(id)}
              className="todo-button-shared-style delete-button"
            >
              Delete
            </span>
          </li>
        );
      })}
    </ul>
  );
};

// TodoView.propTypes = {
//   nameString: PropTypes.string.isRequired,
// };

TodoView.propTypes = {
  todoList: arrayOf(
    shape({
      id: string.isRequired,
      todo: string.isRequired,
    })
  ),
};

export default TodoView;
