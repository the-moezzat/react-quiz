interface IButton {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

function Button({ onClick, text }: IButton) {
  return (
    <button className="btn btn-ui" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
