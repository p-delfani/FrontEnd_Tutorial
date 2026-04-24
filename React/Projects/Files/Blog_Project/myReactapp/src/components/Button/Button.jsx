function Button({ id, clickHandler, children }) {
  return (
    <button id={id} onClick={clickHandler}>
      {children}
    </button>
  );
}

export default Button;
