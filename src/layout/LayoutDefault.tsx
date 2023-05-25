import { HtmlHTMLAttributes } from 'react';
import { Outlet } from 'react-router-dom'

export default function LayoutDefault(props: Props) {
  return (
    <>
      { props.children ? props.children : <Outlet /> }
    </>
  )
}


type Props = HtmlHTMLAttributes<unknown>