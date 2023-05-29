import { AppButton } from "@/components/app"

export default function HomePage() {
  return (
    <div className="flex flex-col dark:bg-secondary-800 h-full transition-colors">
      <header 
        className="
          py-1
          px-2 
          shadow-md
          flex items-center
          transition-colors
          dark:text-secondary-100
          dark:bg-secondary-900
        "
      >

        {/* Github Link */}
        <a 
          href="https://github.com/castillolianrobin/react-vite-component-kits/"
          className="flex gap-3 hover:text-primary-500 transition-colors"
          target="_blank"
        >  
          <img 
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
            alt="GitHub Link"
            className="p-1 rounded-full bg-primary-200 h-6 aspect-square"
          />

          <span>Github</span>
        </a>

        {/* <div class="ml-auto md:mr-5 flex gap-3 items-center">
          <AppDropdown
            trigger-variant="text"
            trigger-text="Components"
          >
            <ul 
              class="
                absolute right-0 
                mt-5 px-2
                shadow-lg max-h-[60vh] 
                overflow-auto 
                scrollbar
                bg-white
                dark:bg-secondary-900
              "
              >
              <li
                v-for="nav in navigations.filter(item=>item.label !== 'Home')"
                :key="nav.label"
              >
                <router-link
                  :to="{ name: nav.routeName }"
                  class="
                    whitespace-nowrap
                    w-full 
                    block 
                    my-2 
                    outline-none            
                    focus-within:text-primary-200
                    hover:text-primary-300
                    border-l-4 border-primary-500/0
                    transition-colors
                  "
                >
                  {{  nav.label  }}
                </router-link>
              </li>
            </ul>
          </AppDropdown>

          <ToggleDarkMode
            :options="{ initialValue: 'dark' }"
          ></ToggleDarkMode>
        </div> */}


      </header>

      <main 
        className="
          px-5 pb-5 
          flex-grow flex-shrink 
          flex flex-col 
          overflow-auto scrollbar
        "
      >
        {/* Title */}
        <h1
          className="
            mt-20 mx-auto
            md:w-[50vw]
            bg-clip-text text-transparent
            bg-gradient-to-r 
            bg-primary-700 dark:from-primary-300 
            to-secondary-700 dark:to-secondary-500
            text-5xl sm:text-7xl md:text-6xl lg:text-8xl text-center font-bold drop-shadow
          "
        >
          Component Kits For React
        </h1>

        {/* Subtitle  */}
        <h3 
          className="
            mt-10 
            text-center text-lg md:text-xl
            text-secondary-500 dark:text-secondary-300
          "
        >
          Themeable dashboard components made with React + Typescript + Tailwind CSS.
        </h3>

        {/* Technologies  */}
        <div className="mt-7 mx-auto w-[200px] md:w-[250px] max-w-full grid grid-cols-3 gap-10">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" 
            alt="React"
            className="aspect-square"
          />


          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" 
            alt="TypeScript"
            className="aspect-square"
          />

          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png" 
            alt="Tailwind"
            className="aspect-square"
          />

        </div>

        {/* Call to actions */}
        <div 
          className="mt-14 mx-auto flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-3 w-[600px] max-w-full"
        >
          <AppButton
            size="lg"
            color="primary-500"
            className="flex-shrink w-2/3 sm:w-1/3"
            to={ '/_component/cards' }
            linkProps={{ target: '_blank' }}
            // target="_blank"
          >
            Components
          </AppButton>


          <a 
            className="flex-shrink sm:w-1/3"
            href="https://github.com/castillolianrobin/react-vite-component-kits/"
            target="_blank"
          >
            <AppButton
              size="lg"
              variant="outline"
              color="secondary-400"
              className="w-full"
            >
              Clone Repo
            </AppButton>
          </a>

          <AppButton
            disabled
            size="lg"
            variant="outline"
            color="secondary-400"
            className="flex-shrink sm:w-1/3"
            // :to="{ name: 'Login'}"
            // target="_blank"
          >
            Sample Dashboard
          </AppButton>
        </div>

      </main>
    </div>
  )
}
