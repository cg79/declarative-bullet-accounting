
export const DeleteButton = ({onClick, text, css=''}: {
  onClick: () => void,
  text: string,
  css?: string
}) => {
  return (
    <button className={`deletebutton ${css}`} onClick={onClick}>{text}</button>
  );
};
