import { FC } from "react";

type TabProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

export const Tab: FC<TabProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      className={`rounded-t-md w-full ${
        isActive ? "border-b-2 border-green-500 font-bold bg-inherit": "font-semibold bg-white"
      } px-4 py-2 focus:outline-none`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
