"use client";
import { CgSpinner } from "react-icons/cg";

interface PropsType extends ReactProps {
  icon?: JSX.Element;
}
export function Spinner({
  icon = <CgSpinner />,
  className = "py-12",
  ...props
}: PropsType) {
  return (
    <div className={`justify-start items-center flex w-full  flex-col text-primary ${className}`}>
      <div className="bounce">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
