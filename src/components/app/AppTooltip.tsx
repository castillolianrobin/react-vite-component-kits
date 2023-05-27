import { useState, type HtmlHTMLAttributes, ReactNode } from 'react';
// Components
import { InformationCircleIcon } from '@heroicons/react/24/solid'
// Hooks
import { type ThemedColorTypes, useThemedColor } from '@/hooks';


export default function AppTooltip(props: Props) {
  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);
  
  /** Tooltip Logic */

  const [ hovered, setHovered ] = useState(false)

  function toggleTooltip(_event: unknown) {
    const event = _event as Event;
    console.log(event.type);
    if (props.showOnClick) {
      if (event.type === 'click') 
        setHovered(!hovered);  
    } else {
      if (event.type === 'mouseenter')
        setHovered(true);  
      else if (event.type === 'mouseleave')
        setHovered(false);  
    }
  }

  /** Tooltip Classes */
  
  const tooltipContainerDirectionClass = ()=>{
    switch (props.direction) {
      case 'left': return 'right-full top-0 bottom-0';
      case 'right': return 'left-full top-0 bottom-0';
      case 'top': return 'bottom-full';
      case 'bottom': default: return 'top-full';
    }
  };

  const arrowDirectionClass = ()=>{
    switch (props.direction) {
      case 'left': return 'border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8';
      case 'right': return 'border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8';
      case 'top': return 'border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8';
      case 'bottom': default: return 'border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8';
    }
  };

  const arrowPositionClass = ()=> {
    const classes = [];
    const direction = props.direction || 'bottom';
    ['top', 'bottom', 'left'].includes(direction) && classes.push('right-0');
    ['top', 'bottom', 'right'].includes(direction) && classes.push('left-0');
    ['bottom', 'left', 'right'].includes(direction) && classes.push('top-0');
    ['left', 'right'].includes(direction) && classes.push('top-1/3');
    ['left', 'top', 'right'].includes(direction) && classes.push('bottom-0');
    return classes.join(' ');
  
  }  
  
  
  return (
    <div
      className="relative inline-flex justify-center"
      aria-label='tooltip-container'
      onMouseEnter={ toggleTooltip }
      onMouseLeave={ toggleTooltip }
      onClick={ toggleTooltip }
    >
      {/* Hoverable Element */}
      {
        props.children 
          ? props.children
          : (<InformationCircleIcon
            className={`mt-0.5 h-5 text-${color}`}
          />)
      }

      {/* Tooltip Element */}
      {
        !hovered 
          ? (<></>)
          : (<div
            className={ `absolute ${ tooltipContainerDirectionClass() }` }
            role="tooltip"
          >
            <div
              className={`
                absolute
                flex justify-center
                ${ arrowPositionClass() }

              `}
            >
              {/* Arrow */}
              <div
                className={`
                  w-0 h-0
                  border-${color}
                  ${ arrowDirectionClass() }
                `}
              ></div>
            </div>  
            {/* Text */}
            <label
              className={ `
                block
                p-1 m-1.5
                rounded
                min-w-max
                shadow 
                sticky left-0
                bg-${color}
                text-white text-xs
              ` }
            >
              {/* Tooltip Slot */}
              { props.tooltipText }
            </label>
          </div>)
      }
    </div>
  )
}

interface Props extends HtmlHTMLAttributes<unknown> {
  /** Basic text to be displayed inside the tooltip */
  tooltipText: string | ReactNode;
  /** direction of the tooltip (top, bottom, left, right) */
  direction?: "top" | "bottom" | "left" | "right";
  showOnClick?: boolean,
  color?: ThemedColorTypes.ThemeColors;
}

