import { classNames } from "@/utils/className";
import cls from "./Checkbox.module.scss";

interface CheckboxProps {
  className?: string;
}
export const Checkbox = (props: CheckboxProps) => {
  const { className } = props;
  return (
    <input
      className={classNames(cls.checkbox, {}, [className ? className : ""])}
      type="checkbox"
    />
  );
};
