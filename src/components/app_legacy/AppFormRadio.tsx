import { ThemedColorTypes, useThemedColor } from "@/hooks";
import { InputHTMLAttributes } from "react";
// import { useThemedColor } from "../../utils/useThemedColor";


export default function AppFormRadio(props: Props) {

  // Themed color hook
  const { color } = useThemedColor(props.color);
  
  // value to check whether the state is active or not
  const activeValue = props.activeValue || props.label || true;
  const isActive = props.value === activeValue;
  
  /** Handles The input event of main input element*/
  function onChangeHandler(){
    const inputValue = activeValue;
    props.onValueChange && props.onValueChange(inputValue);
    // props.onChange && props.onChange(inputValue);
  }

  return (
    <div 
      className="group flex gap-1 items-center cursor-pointer"
      onClick={onChangeHandler}
      >
      {/* Radio Button */}
      <div 
        tabIndex={1}
        className={`
          h-[1rem] w-[1rem] 
          p-0.5
          rounded-full
          border 
          border-${color}-500
          group-hover:outline
          outline-primary-200
          transition-[outline] ease-in-out duration-75
        `}
        onKeyDown={e=>e.key === ' ' && onChangeHandler()}
      >
        { isActive && (
          <div className={`rounded-full h-full w-full bg-${color}-500`}></div>
        ) }
        
      </div>
      <label 
        htmlFor="" 
        className={`
          text-sm group-hover:text-${color}-500 
          ${isActive && `text-${color}-500`} 
          cursor-pointer
        `}
      >
        { props?.label }
      </label>
    </div>
  )
}

interface Props extends RadioChildProps {
  onValueChange?: (e?: unknown) => void;
}

export interface RadioChildProps extends InputHTMLAttributes<unknown> {
  label?: string;
  color?: ThemedColorTypes.ThemeColors;
  activeValue?: unknown;
}

