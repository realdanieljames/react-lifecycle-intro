import React from "react";

const Span = (props) => {
  // console.log(props)
  let spanDisabledDeleteButton = props.disabledButton
    ? props.disabledClass
    : "";
  //let spanOnClick = onClick ? onClick : () => {};

  let spanOnClick;

  if (!props.onClick) {
    spanOnClick = () => {};
  } else {
    spanOnClick = props.onClick;
  }

  return (
    <span
      className={`${props.className} ${spanDisabledDeleteButton}`}
      onClick={() => spanOnClick(props.id)}
    >
      {props.value}
    </span>
  );
};

export default Span;
