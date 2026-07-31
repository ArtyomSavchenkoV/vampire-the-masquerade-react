import { Button } from "baseComponents/Button";
import { ChangeEventHandler, ComponentProps, FC, useRef } from "react";

interface TProps extends ComponentProps<typeof Button> {
  onFileOpen: (fileContent: string | ArrayBuffer | null | undefined) => void;
}
const OpenFileButton: FC<TProps> = ({ onFileOpen, onClick, ...props }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    // 👇️ Open the file input box on click of another element
    inputRef.current?.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    // Reset file input
    event.target.value = "";

    const reader = new FileReader();
    reader.onload = (openEvent) => onFileOpen(openEvent.target?.result);
    reader.readAsText(fileObj);
  };

  return (
    <>
      <Button
        onClick={(event) => {
          handleClick();
          onClick?.(event);
        }}
        {...props}
      />

      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
    </>
  );
};

export default OpenFileButton;
