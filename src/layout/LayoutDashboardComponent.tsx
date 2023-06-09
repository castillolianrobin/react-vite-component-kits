import { ToggleDarkMode } from "@/components"
import { AppButton } from "@/components/app"
import componentRoutes from "@/modules/_components/_components.routes"
import { HtmlHTMLAttributes, useState, } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { useDarkMode } from 'usehooks-ts';


export default function LayoutDashboardComponent(props: Props) {
  /** Dark Mode Hook */
  const { isDarkMode } = useDarkMode();
  
  
  return (
    <div
      className={ `h-full w-full ${ isDarkMode ? 'dark' : 'light' }` }
    >
      <div 
        {  ...props } 
        className={ `
          relative 
          w-full h-full 
          grid grid-rows-dashboard grid-cols-dashboard
          text-secondary-800 dark:text-secondary-200
          bg-secondary-100 dark:bg-secondary-900
          transition-colors
        ` }
      >
        {/* Top Navigation */}
        <TopBar></TopBar>
        
        {/* Side Bar */}
        <SideBar
          className="row-start-2"
        ></SideBar>


        {/* Main Content */}
        <main 
          className="
            scrollbar
            row-start-2 col-start-2 
            overflow-auto
          "
        >
          { props.children || (<Outlet />) }
        </main>
      </div>
    </div>
  )
}


function TopBar() {
  return (
    <header 
      className="
        px-1 md:px-3 py-1
        flex items-center
        bg-secondary-50 dark:bg-secondary-800
        text-black dark:text-white
        row-start-1 col-span-2
        shadow-md 
        border-b dark:border-secondary-700
        transition-colors
      "
    >
      {/* Github Link */}
      <a 
        href="https://github.com/castillolianrobin/react-vite-component-kits/"
        className="p-1 rounded-full bg-secondary-50 hover:underline"
        target="_blank"
      >  
        <img 
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
          alt="GitHub Link"
          className="h-5 aspect-square"
        />
      </a>

      {/* Title */}
      <h1 className="mx-3 my-2 flex-grow text-center font-semibold truncate ">
        <span>Component Kits For React</span> 
        <span className="text-secondary-400 hidden md:inline"> / Vite + React 18 + Typescript</span>
      </h1>

      <ToggleDarkMode></ToggleDarkMode>
    </header>
  )
}

function SideBar(props: SideBarProps) {
  const [isActive, setIsActive] = useState(false)
  return (
    <div
      className={`
        flex
        relative
        h-full
        bg-primary-900 text-secondary-200
        shadow-xl
        z-20
        ${ props.className }
      `}
    >
      {/* Mobile Hamburger Button */}
      <div className="p-1 flex-shrink-0 md:sr-only z-20 shadow-md">
        <AppButton
          variant="outline"
          size="sm"
          className="px-0.5"
          color="white"
          onClick={ ()=>setIsActive(!isActive) }
        >
          { isActive 
            ? (<>&lsaquo;</>) 
            : <>&rsaquo;</> 
          }
        </AppButton>
      </div>

      {/* Main Side Navigation */}
      <aside 
          className={`
            transition-all
            md:w-screen max-w-[250px] h-full 
            overflow-auto
            absolute md:relative left-full md:left-0  
            bg-inherit
            ${ isActive ? 'w-screen' : 'w-0' }
          `}
        >

          <ul className="mt-5">
            { componentRoutes.map(nav => (
              <li key={ nav.label }>
                <NavLink
                  to={ `${nav.path}` }
                  className={({ isActive })=>`
                    w-full 
                    block 
                    pl-3 my-2 
                    outline-none            
                    focus-within:text-primary-200
                    hover:text-primary-300
                    border-l-4 
                    transition-colors
                    ${ 
                      isActive 
                        ? 'border-primary-500/100 font-semibold' 
                        : 'border-primary-500/0' 
                    }
                  `}
                  onClick={()=>setIsActive(false)}
                >
                  { nav.label }
                </NavLink>
              </li>
            )) }
          </ul>
      </aside>
    </div>
  )
}



/** __TYPE DEFINITIONS__ */


type Props = HtmlHTMLAttributes<unknown>

type SideBarProps = HtmlHTMLAttributes<unknown>;
