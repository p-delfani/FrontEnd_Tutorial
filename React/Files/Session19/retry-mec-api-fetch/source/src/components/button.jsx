const Button = ({ children, onClick, outlined }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        outlined
          ? "bg-transparent  border border-zinc-300  hover:bg-gradient-to-t from-zinc-200 text-black"
          : "bg-gradient-to-t from-zinc-900 to-zinc-700 text-white"
      } text-sm px-3 py-1.5 rounded-md cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
