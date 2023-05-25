import { createContext, useContext } from "react";

const colorContext = createContext<ThemeColors>('primary-500');

export function useCreateThemedColor(color:ThemeColors = 'primary-500') {
  const ColorProvider = colorContext.Provider;
  return { ColorProvider, color };
}

export function useThemedColor(_color:ThemeColors = 'primary-500') {
  // add provide
  const color = useContext(colorContext) ||  _color;
  return { color };  
}


/** __TYPE DEFINIITION__ */

/** List of available color names in the project's theme */
type ThemeNames = 'primary'|'secondary'|'info'|'alert'|'error'|'success';

/** Type format definition for availble theme colors */
export type ThemeColors = `${ThemeNames}-${number}`|'black'|'white'|`[${string}]`;
