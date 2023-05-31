import { InputHTMLAttributes, ReactNode, MouseEvent, KeyboardEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Hooks
import { ThemedColorTypes, useThemedColor } from "@/hooks";
import { AppButton } from ".";

export default function AppSteps(props: Props) {
  /** Themed Color composables */
  const { color } = useThemedColor(props.color);


  /** Step Logic */
  
  // Current steate
  const [currentStep, setCurrentStep] = useState<number>(props.value || 1);

  // Formatted steps for display
  const steps = ()=>{
    const _steps: StepDisplay[] = [];

    if (Array.isArray(props.steps)) {
      for (let i = 0; i < props.steps.length; i++) {
        const name =  `Step ${i + 1}`;
        _steps.push({ name,  content: props.steps[i] });
      }
    } else {
      for (const name in props.steps) {
        _steps.push({ name, content: props.steps[name] });
      }
    }
    return _steps;
  }

  /** On change hanlder for steps */
  function gotoStep(step = currentStep + 1, e?: KeyboardEvent | MouseEvent) {
    if (props.disabled) return;
    if (e && e.type === 'keydown'  
      && !['Enter', ' '].includes((e as KeyboardEvent).key) 
    ) {
      return
    }
    setCurrentStep(step);
    props.onValueChange && props.onValueChange(step);
  }

  // Watches if props.value changes
  useEffect(()=>{
    if (props.value !== currentStep) {
      setCurrentStep(props.value || 1)
    }
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [ props.value ]
  )

  
  
  return (
    <div className="flex flex-col">
      {/* Steps */}      
      <ol className="flex flex-wrap">
        { steps().map((step, i, stepsArr)=>(
          <li
            key={ step.name + i }
            aria-current={ currentStep && (i+1) === +currentStep ? 'step' : false }
            className={`
              flex-grow 
              flex flex-col
              text-xs md:text-sm
              ${ (i+1) === 1 ? 'hidden md:flex' : '' }
            `}
          >
            {/* Step Number */}
            <div 
              className="
                relative
                flex-grow 
                flex items-center justify-center
              "
            >
              <div
                className={`
                  z-10
                  w-5 md:w-7
                  aspect-square 
                  cursor-pointer
                  rounded-full
                  hidden sm:flex items-center justify-center
                  transition-colors
                  outline-${color} focus:outline-4
                  ${ 
                      currentStep && (i+1) <= +currentStep 
                        ?  `bg-${color} text-white` : ''
                  }
                  ${ 
                    currentStep && (i+1) > +currentStep 
                      ?  `bg-secondary-100 dark:bg-secondary-600 text-secondary-300 dark:text-secondary-300` : ''
                  }
                `}
                tabIndex={ 0 }
                onClick={(e)=>gotoStep(i+1, e)}
                onKeyDown={(e)=>gotoStep(i+1, e)}
              >
                { i+1 }
              </div>


              {/* Line 1 */}
              <div
                className={`
                  w-1/2 h-1 absolute left-0 transition-colors
                  ${ (i+1) === 1 ? 'sm:sr-only' : '' }
                  ${  currentStep && (i+1) <= +currentStep ? `bg-${color}` : '' }
                  ${ currentStep && (i+1) > +currentStep ? 'bg-secondary-300 dark:bg-secondary-600' : '' }
                `}
              ></div>

              {/* Line 2 */}
              <div 
                className={`
                  w-1/2 h-1 absolute right-0 transition-colors
                  ${ (i+1) ===  stepsArr.length ? 'sm:sr-only' : '' }
                  ${ currentStep && (i+1) < +currentStep ? `bg-${color}` : '' }
                  ${ currentStep && (i+1) === +currentStep ? 'sm:bg-secondary-300 sm:dark:bg-secondary-600' : '' }
                  ${ currentStep && (i+1) > +currentStep ? 'bg-secondary-300 dark:bg-secondary-600' : '' }
                `}
              ></div>
            </div>


            {/* Step text */}
            <div 
              className="min-h-[2rem] hidden sm:flex justify-center"
            >
              <span
                className={`
                  flex-grow text-center md:block
                  ${ currentStep && +currentStep === (i+1) ? 'absolute md:relative' : '' }
                  ${ currentStep && +currentStep !== (i+1) ? 'hidden' : '' }
                ]"`}
              >
                { step.name }
              </span>
            </div>
          </li>
        )) }
      </ol>

      {/* Content */}
      <div 
        className={`my-3 relative overflow-hidden ${props.containerClass}`}
      >
        <AnimatePresence initial={ false } mode="wait">
          { steps().map((step, i)=>{
            return (currentStep && i+1 === +currentStep || props.eager) 
            && (
              <motion.div
                key={ `${step.name}-content` }
                initial={{ opacity: 0, translateX: '100' }}
                exit={{ opacity: 0, translateX: -100 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                animate={{ 
                  opacity: currentStep && i+1 === +currentStep ? 1 : 0, 
                  translateX: currentStep && i+1 === +currentStep ? 0 : -100,
                  transitionEnd: { 
                    position: currentStep && i+1 === +currentStep ? 'relative' : 'absolute', 
                    translateX: currentStep && i+1 === +currentStep ? 0 : 100,
                  }
                }}
              >
                { step.content }
              </motion.div>
            )
          }) }
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div 
        className="
          pt-2 
          flex sm:justify-end gap-4 
          border-t dark:border-secondary-400
        "
      >

        <AppButton
          disabled={ props.disabled || +currentStep === 1 }
          variant="outline"
          aria-label="previous step button"
          className="flex-grow sm:flex-grow-0"
          color={ color }
          onClick={ ()=>gotoStep(currentStep - 1) }
        >
          Previous
        </AppButton>

        <AppButton
          disabled={ props.disabled || +currentStep === steps().length }
          aria-label="next step button"
          className="flex-grow sm:flex-grow-0"
          color={ color }
          onClick={ ()=>gotoStep(currentStep + 1) }
        >
          Next
        </AppButton>

      </div>
    </div>
  )
}


/** __TYPE DEFINITION__ */

export interface Props extends InputHTMLAttributes<unknown> {
  value?: number;
  onValueChange?: (e: number ) => void;
  steps: ReactNode[] | StepObject;
  color?: ThemedColorTypes.ThemeColors;
  disabled?: boolean;
  eager?: boolean;
  containerClass?: string;
}


export type StepObject = Record<string, ReactNode>


export type StepDisplay = {
  name: string;
  content: ReactNode;  
}