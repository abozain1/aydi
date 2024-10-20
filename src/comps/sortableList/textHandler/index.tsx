interface ITextHandlerProps {
  content: string;
  handleTextChange: (content: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export default function TextHandler(props: ITextHandlerProps) {
  const { content, handleTextChange, handleKeyDown } = props;
  return (
    <input
      type="text"
      value={content}
      onChange={(e) => {
        const newContent = e.target.value.slice(0, 11);
        handleTextChange(newContent);
      }}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
}
