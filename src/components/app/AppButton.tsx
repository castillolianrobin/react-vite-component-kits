import { ButtonHTMLAttributes } from "react";
import { useThemedColor, ThemedColorTypes } from "@/hooks";
import { AppLoading } from ".";

export default function AppBtn(props: Props) {
   
  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);

  /** Button Logic */

  const buttonProps = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color, loading, variant, ...rest} = props;
    return rest;
  };

  
  /** CSS Classes */

  const sizeClass = ()=>{
    switch (props.size) {
      case 'lg': return 'text-lg py-1.5 px-2.5';  
      case 'sm': return 'text-sm px-1 py-0.5';  
      case 'md': default: return 'py-1 px-2';
    }
  };

  
  const bgClass = ()=>{
    switch (props.variant) {
      case 'text': return `bg-transparent`;   
      case 'outline': return `bg-transparent hover:bg-${color} active:bg-transparent disabled:bg-transparent`;   
      case 'solid': default: return `bg-${color}`;
    }
  };
  const borderClass = ()=>{
    switch (props.variant) {
      case 'text': return `border-transparent`;   
      case 'outline': return `border-${color}`;   
      case 'solid': default: return `border-${color}`;
    }
  };
  const textClass = ()=>{
    switch (props.variant) {
      case 'text': return `text-${color} disabled:text-opacity-50 hover:brightness-150`;    
      case 'outline': return `text-${color} hover:text-white active:text-${color} disabled:text-${color}`;   
      case 'solid': default: return `text-white`;
    }
  }

  return (
    <button
      { ...buttonProps() }
      className={`
        relative
        flex items-center justify-center
        rounded border-2
        transition
        disabled:opacity-75
        focus:outline-${color}/25 outline-2
        ${ sizeClass() } 
        ${ bgClass() }
        ${ borderClass() }
        ${ textClass() }
        ${ props.className }
        ${ props.disabled || props.loading ? 'cursor-default' : '' }
        ${ props.variant !== 'text' && !props.disabled && !props.loading ? 'hover:shadow' : ''}
        ${ props.variant !== 'outline' && !props.disabled && !props.loading ? 'hover:brightness-110 active:brightness-75' : '' }
      `}
      aria-busy={ props.loading }
    >
      { props.loading &&
        <AppLoading 
          className="absolute" 
          color={color}
        ></AppLoading>
  
      }
      <span className={ props.loading ? 'opacity-0' : '' }> 
        {  props.children }
      </span>
    </button>
  );
}

/** __TYPE DEFINITIONS__ */

export interface Props extends ButtonHTMLAttributes<unknown> {
  color?: ThemedColorTypes.ThemeColors;
  loading?: boolean;
  size?:'lg' | 'md' | 'sm';
  variant?: 'solid' | 'outline' | 'text';
  to?: string;
}
