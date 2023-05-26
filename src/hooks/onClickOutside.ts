import { useEffect } from "react";

export function useClickOutside<T>
(ref: React.MutableRefObject<T>, e: CallableFunction) {
  useEffect(() => {
    /**
     * Activate if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (!ref.current) return;
      const current = ref.current as unknown as HTMLDivElement;
      if (!current.contains(event.target as Node)) {
        e(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ ref ]);
}