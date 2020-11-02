import React from "react";
import { arrayOf, shape, number, string } from "prop-types";

const TodoView = ({
  todoList,
  nameString,
  age,
  arrayObject,
  trueOrFalse,
  addFunc,
  obj,
}) => {
  console.log(todoList);
  return (
    <ul style={{ listStyle: "none" }}>
      {todoList.map(({ id, todo }) => {
        return <li key={id}>{todo}</li>;
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
