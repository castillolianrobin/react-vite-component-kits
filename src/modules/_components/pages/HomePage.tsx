import { NavLink } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="p-3 md:p-10 h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-4xl text-center font-bold text-primary-600 uppercase">
        Component Sets for Dashboard
      </h1>

      <p className="mt-5 text-sm md:text-lg text-center text-secondary-400 italic">
        "Themeable dashboard components made with React + Typescript + Tailwind CSS."
      </p>
      <p className="mt-7 text-center text-xs md:text-base">
        A set of react functional components utilizing Tailwind css with the intention to improve the acceleration of development by providing reusable components similar to Vuetify but with the styling flexibility of Tailwind.
        <br />
        <br />
        The components are customizable and themeable, specially in colors. All the components uses custom colors declared in the tailwind config 
        (
          <span className="text-primary-500">primary</span>, 
          <span className="text-secondary-500">secondary</span>, 
          <span className="text-alert-500">alert</span>, 
          <span className="text-error-500">error</span>, 
          <span className="text-success-500">success</span> 
        ). 
        The components itself are also flexible via props which would lessen the need to customize the component codebase.
      </p>
      <div 
        className="
          mx-10 mt-10 pt-5 
          border-t-2 w-full 
          flex flex-col md:flex-row items-center justify-center gap-4 text-primary-800 dark:text-primary-300
        "
      >
        {/* Github Link */}
        <a 
          href="https://github.com/castillolianrobin/react-vite-component-kits/"
          className="flex items-center hover:text-primary-500 hover:underline"
          target="_blank"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
            alt="GitHub Link"
            className="h-5 aspect-square"
          />

          <p className="ml-2">GITHUB</p>
        </a>

        {/* Netlify Sample */}
        {/* <NavLink
          to={ '/login' }
          className="flex items-center hover:text-primary-500 hover:underline"
          target="_blank"
        >
          <img 
            src="https://static-00.iconduck.com/assets.00/netlify-icon-507x512-sppiy9gt.png" 
            alt="GitHub Link"
            className="h-5 aspect-square"
          />

          <p className="ml-2">SAMPLE DASHBOARD</p>
        </NavLink> */}

        {/* Netlify Sample */}
        <a 
          href="https://zen-wozniak-de473d.netlify.app/login"
          className="flex items-center hover:text-primary-500 hover:underline"
          target="_blank"
        >
          <img 
            src="https://static-00.iconduck.com/assets.00/netlify-icon-507x512-sppiy9gt.png" 
            alt="GitHub Link"
            className="h-5 aspect-square"
          />

          <p className="ml-2">SAMPLE DASHBOARD <span className="text-secondary-400">(LEGACY)</span></p>
        </a>
      </div>
    </div>
  )
}
