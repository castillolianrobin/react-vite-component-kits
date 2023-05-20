import { ButtonHTMLAttributes } from "react";
import { useThemedColor } from "../../utils/useThemedColor";

export default function AppBtn(props: Props) {
  const { color } = useThemedColor(props.color);

  const _props = { ...props };
  delete _props['color'];
  delete _props['loading'];
  delete _props['outline'];
  return (
    <button
      {..._props}
      className={`
        mt-5 
        py-1 px-3
        rounded 
        outline-${color}-200 hover:outline disabled:outline-0
        transition-[outline-width] ease-in-out duration-75
        border border-${color}-500 disabled:border-${color}-200
        ${ props.outline 
          ? `text-${color}-500`
          : `text-white bg-${color}-500 disabled:bg-${color}-200`
        } 
        ${props.className}
      `}
    >
      { props.loading ? 'Loading...' : props.children }
    </button>
  );
};


interface Props extends ButtonHTMLAttributes<unknown> {
  color?: string;
  outline?: boolean;
  loading?: boolean;
  // size?: 'sm' |
}