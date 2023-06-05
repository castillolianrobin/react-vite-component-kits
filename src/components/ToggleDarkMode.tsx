import { InputHTMLAttributes, KeyboardEvent } from "react";
import { AppFormCheckbox } from "./app"
import { useDarkMode } from 'usehooks-ts';

export default function ToggleDarkMode(props: Props) {
  
  /** Dark Mode Hook */
  const { isDarkMode, toggle } = useDarkMode(props.default);
  
  /** Toggle Dark Mode Logic */

  function onKeyDownHandler(e: KeyboardEvent<HTMLDivElement>) {
    if ( [' ', 'Enter'].includes(e.key)) toggle();
  }

  return (
    <AppFormCheckbox
      value={ isDarkMode }
      onValueChange={ toggle }
      // v-model="isDarkMode"
      className="ml-auto"
      toggleInput
      checkbox={ () => (
        <div 
          tabIndex={ 0 }
          className="
            p-[1px] 
            mx-2 
            w-9 h-5 
            border border-secondary-500 
            rounded-full
            focus:outline outline-1 outline-secondary-600 dark:outline-secondary-300
            bg-secondary-200
            dark:bg-secondary-600
            transition
          "
          onKeyDown={ onKeyDownHandler }
        >
          <div className=" relative w-full h-full">
            <div 
              className={`
                absolute 
                transition  
                h-full 
                aspect-square 
                rounded-full
                flex items-center justify-center
                text-[0.7rem]
                select-none
                dark:bg-secondary-800 
                bg-white
                shadow
                ${ isDarkMode ? 'translate-x-full' : '' }
              `}
            >
              {
                isDarkMode ? (<>&#x263e;</>) : (<>&#9788;</>)
              }
            </div>
          </div>
        </div>
      )}
    >
    </AppFormCheckbox>
  )
}


/** __TYPE DEFINITION__ */

interface Props extends InputHTMLAttributes<unknown> {
  default?: boolean;
}