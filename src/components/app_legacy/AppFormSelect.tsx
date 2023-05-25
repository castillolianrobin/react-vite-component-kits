import { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import {AppFormError, AppFormLabel, AppFormInputContainer } from ".";
import { 
  useValidation, 
  useThemedColor, 
  Validations, 
  FormValidation 
} from "../../utils";
import { motion, AnimatePresence } from "framer-motion";
import { objectHelper } from "../../helpers";
export default function AppFormSelect(props: Props) {
  const [active, setActive] = useState(false);
  // Input watcher
  const inputHasChanged = useRef(false);

  // useValidation Hook
  const { 
    errors: validationErrors,
    runValidations 
  } = useValidation(props.value, props.validations || [], props?.formValidation)
  
  const error = `${props.error || validationErrors[0] || ''}`
  
  useEffect(()=>{ 
    inputHasChanged.current && runValidations() 
  }, [props.value]);

  // use themed color hook
  const { color } = useThemedColor(props.color);

  /** Handles The input event of main input element*/
  function onChangeHandler(item: string | SelectItem, i: number){
    // const inputValue = e.currentTarget.value;
    inputHasChanged.current = true;
    props.onValueChange && props.onValueChange(getitemValue(item), i, item);
    typeof item === 'object' 
      && typeof item.onClick === 'function' 
      && item.onClick(()=>getitemValue(item), i, item);
    props.preventAutoClose || setActive(false);
  }

  
  // Helpers
  
  // input element props (remove unneeccesary properties)
  const _props = objectHelper.deleteProperties<InputHTMLAttributes<unknown>>(
    props, 
    ['formValidation', 'onValueChange']
  );

  function getItemLabel(item: SelectItem | string) {
    return typeof item === 'string'
      ? item
      : item.label || item.value
  }

  function getitemValue(item: SelectItem | string) {
    return typeof item === 'string'? item : item.value
  }

  function onItemSelect() {
    
  }

  
  return (
    <div className={`group ${props.hidden ? 'hidden' : 'block'}`}>
      {/* Label */}
      <AppFormLabel>{ props.label }</AppFormLabel>

      {/* Input Container */}
      <AppFormInputContainer
        color={color}
        error={!!error}
        append={props.append}
        prepend={props.prepend}
        disabled={props.disabled}
        className="cursor-pointer"
      >
        {/* Input */}
        <input
          { ..._props }
          value={ props.value }
          readOnly
          className="cursor-pointer px-1 bg-transparent outline-none" 
          onClick={()=>setActive(!active)}
        />
        {/* Select Items  */}
        <AnimatePresence initial={false} mode='wait'>
          { active && 
            <motion.ul 
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.1 }}
              className="
                z-20
                absolute left-0 top-[105%] 
                w-full shadow border
              "
            >
              {props.items.map((item, i)=>(
                <li 
                  key={`item-${i}`}
                  className={`
                    p-1
                    hover:bg-${color}-500
                    hover:text-white
                  `}
                  onClick={()=>onChangeHandler(item, i)}
                >
                  { getItemLabel(item) }
                </li>
              ))}
            </motion.ul>
          }
        </AnimatePresence>
      </AppFormInputContainer>

      {/* Error Message */}
      <AppFormError>{ error }</AppFormError>
    </div>
  )
}

interface Props extends InputHTMLAttributes<unknown> {
  items: string[] | SelectItem[];
  preventAutoClose?: boolean;
  onValueChange?: (value: any, i: number, item: SelectItem | string) => void;
  label?: string;
  error?: string | ReactNode;
  color?: string;
  prepend?: string | number | ReactNode;
  append?: string | number | ReactNode;
  validations?: Validations;
  formValidation?: FormValidation;
}

export interface SelectItem {
  value: any;
  label: string;
  key?: string | number;
  onClick?: (...params: any) => void;
}