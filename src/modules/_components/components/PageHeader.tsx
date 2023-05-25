import { HtmlHTMLAttributes } from "react";

export default function PageHeader(props: HtmlHTMLAttributes<unknown>) {
  return (
    <h3 
      { ...props }
      className="
        mb-10 
        block 
        text-lg 
        font-semibold 
        text-primary-900 dark:text-primary-200 
        border-b-2 dark:border-secondary-700
      "
    >
      { props.children }
    </h3>
  )
}
