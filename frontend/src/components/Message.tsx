import { useEffect } from "react";

type MessageProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Message = ({ message, type, onClose }: MessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // after the state it manage changes the
    }, 5000);
    return () => {
      clearTimeout(timer); // when it's removed from the DOM
    };
  }, [onClose]);
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Message;
