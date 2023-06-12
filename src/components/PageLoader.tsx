import { usePageLoadingStore } from "@/stores/pageLoadingStore";
import { useEffect, useState } from "react";

export default function PageLoader() {
  
  const pageLoading = usePageLoadingStore((state)=>state.pageLoading);
  // const { pageLoading } = storeToRefs(usePageLoadStore())
  const [loadingPercent, setLoading] = useState(0);
  const [hideLoading, setHideLoading] = useState(false);
  const [interValId, setInterValId] = useState<ReturnType<typeof setInterval>>();
  function runLoading() {
    setLoading(loadingPercent + 5)
    if (loadingPercent > 60) {
      clearInterval(interValId);
    }
  }

  useEffect(()=>{
    if (pageLoading) {
      setHideLoading(false)
      setLoading(loadingPercent + 15);
      if (!interValId) {
        setInterValId(setInterval(runLoading, 100))
      }
    } else {
      clearInterval(interValId);
      setLoading(100);
      setTimeout(()=>setHideLoading(true), 700);
    }
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [ pageLoading ]
  )
  
  return (
    <div
      className={ `
        ${ hideLoading ? 'hidden' : 'block' }
        w-full h-1 z-50 fixed top-0 bg-transparent
      ` }
    >
      <div 
        className="
          h-full 
          bg-primary-400 dark:bg-primary-600
        "
        style={{
          width: `${loadingPercent}%`,
          transition: 'width 0.3s ease-in-out', 
        }}
      ></div>
    </div>
  )
}
