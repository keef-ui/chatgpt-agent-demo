import { useEffect , useState} from "react";
import List from './nav-list'; 
import IconButton from "./buttons/button-icon"
import UserProfile from "./user-profile";


// Style:guide for nav :https://tw-elements.com/docs/standard/navigation/sidenav/

const Nav = ({items,sideNavHidden}) => {
//  let hidden = window.innerWidth<968 ? true : false


  useEffect(() => {
    const init = async () => {
      const { initTE, Sidenav } = await import("tw-elements");
      initTE({ Sidenav });
      console.log(Sidenav.isVisible)
    };
    init();
    console.log(items)
    
  
    
    //TODO: For reszizng detect screen size and set the follwoing to hidden Set   data-te-sidenav-hidden = 'true'
    // Todo: Use window resize -  see example page
    //if state is hidden then remove the paddinf stuff from #content
    //      className={`fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] md:data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800`}
  }, []);


  return (
    <nav
      id="sidenav-2"
      className={`fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] ${sideNavHidden ? "!-translate-x-100" : "!translate-x-0" } dark:bg-zinc-800`}
      data-te-sidenav-init
      data-te-sidenav-hidden = {sideNavHidden}
      data-te-sidenav-mode-breakpoint-over="0"
      data-te-sidenav-mode-breakpoint-side="sm"
      data-te-sidenav-mode="side"
      data-te-sidenav-content="#content"
      data-te-sidenav-width="240"
    >    {sideNavHidden}
    <UserProfile />
    <List items={items}/>
    </nav>
  );
};

export default Nav;
