import { useEffect , useState} from "react";
import List from './nav-list'; 
import IconButton from "./buttons/button-icon"
import UserProfile from "./user-profile";

// Style:guide for nav :https://tw-elements.com/docs/standard/navigation/sidenav/

const Nav = ({items}) => {
  useEffect(() => {
    const init = async () => {
      const { initTE, Sidenav } = await import("tw-elements");
      initTE({ Sidenav });
    };
    init();
    console.log(items)
  }, []);


  return (
    <nav
      id="sidenav-2"
      className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] md:data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
      data-te-sidenav-init
      data-te-sidenav-hidden = 'false'
      data-te-sidenav-mode-breakpoint-over="0"
      data-te-sidenav-mode-breakpoint-side="sm"
      data-te-sidenav-mode="side"
      data-te-sidenav-content="#content"
    >     
    <UserProfile />
    <List items={items}/>
    </nav>
  );
};

export default Nav;
