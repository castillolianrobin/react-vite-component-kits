import { usePageLoadingStore } from "@/stores/pageLoadingStore";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

export default function PageLoader() {
  
  const pageLoading = usePageLoadingStore((state)=>state.pageLoading);
  // const { pageLoading } = storeToRefs(usePageLoadStore())
  const [loadingPercent, setLoading] = useState(0);
  const [hideLoading, setHideLoading] = useState(false);
  const [intervalDelay, setIntervalDelay] = useState(0);
  console.log('mounting')
  
  // const runLoading = 
  console.log('interval', intervalDelay, intervalDelay > 0 ? intervalDelay : null)
  useInterval(() => {
    console.log('test', loadingPercent, loadingPercent + 5);
    setLoading((loadingPercent + 5))
    if (loadingPercent > 60) {
      setIntervalDelay(0);
    }
  }, intervalDelay > 0 ? intervalDelay : null)
  
  useEffect(()=>{
    if (pageLoading) {
      setHideLoading(false)
      setLoading(15);
      setIntervalDelay(200);
    } else {
      setIntervalDelay(0);
      setLoading(100)
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
