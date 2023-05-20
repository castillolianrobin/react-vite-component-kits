import { InputHTMLAttributes } from "react";
import { useThemedColor } from "../../utils/useThemedColor";


export default function AppFormCheckbox(props: Props) {

  // Themed color hook
  const { color } = useThemedColor(props.color);
  
  // value to check whether the state is active or not
  const activeValue = props.activeValue || props.label || true;
  const inactiveValue = props.inactiveValue || false;
  
  const isActive = props.value === activeValue;
  
  /** Handles The input event of main input element*/
  function onChangeHandler(){
    const inputValue = props.value !== activeValue 
      ? activeValue 
      : inactiveValue;
    props.onValueChange && props.onValueChange(inputValue);
    props.onChange && props.onChange(inputValue);
  }

  return (
    <div 
      className="group flex gap-1 items-center cursor-pointer"
      onClick={onChangeHandler}
      >
      {/* Checkbox Button */}
      <div 
        tabIndex={1}
        className={`
          h-[1rem] w-[1rem] 
          border
          border-${color}-500
          group-hover:outline
          outline-primary-200
          transition-[outline] ease-in-out duration-75
        `}
        onKeyDown={e=>e.key === ' ' && onChangeHandler()}
      >
        { isActive && (
          <div 
            className={`
              relative 
              flex items-center justify-center 
              h-full w-full 
              text-white
              bg-${color}-500
            `}
          >
             <span className="absolute font-bold">&#x2713;</span>
          </div>
        ) }
        
      </div>
      <label 
        htmlFor="" 
        className={`
          cursor-pointer
          text-sm group-hover:text-${color}-500 
          ${isActive && `text-${color}-500`} 
        `}
      >
        { props?.label }
      </label>
    </div>
  )
}

interface Props extends CheckboxChildProps {
}

export interface CheckboxChildProps extends InputHTMLAttributes<unknown> {
  value?: any;
  key?: string | number;
  label?: string;
  color?: string;
  activeValue?: any;
  inactiveValue?: any;
  onValueChange?: (e?: any, ...params: any) => void;
}

