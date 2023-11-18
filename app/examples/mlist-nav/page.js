"use client";
import { useEffect } from "react";
import MultiList from "../../../components/nav-list-multi"
import Button from "@/components/buttons/button";
import UserProfile from "@/components/user-profile";

const MyComponent = () => {
  useEffect(() => {
    const init = async () => {
      const { initTE,  Sidenav } = await import(
        "tw-elements"
      );

      initTE({ Sidenav });
    };
    init();
  }, []);

  return (
        <>

<NavTest />
<div class="p-5 !pl-[260px] text-center" id="content">



<Button type='primary' dataAttributes={sidenavButtonAttributes}>Test</Button>

<div class="my-5 flex text-start">
  Main ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc magna
  massa, ornare quis interdum a, cursus in quam. Quisque risus libero,
  cursus eget eros vitae, aliquam placerat velit. Vivamus luctus eros id
  sagittis luctus. Pellentesque felis nulla, rhoncus viverra nunc vitae,
  viverra aliquam ante. Ut feugiat mattis tempor.
</div>
</div>


        </>
  );
};

export default MyComponent
  

const NavTest = () => {
  useEffect(() => {
    const init = async () => {
      const { initTE, Sidenav } = await import("tw-elements");
      initTE({ Sidenav });
    };
    init();
   
  }, []);


  return (
<nav
  id="sidenav-1"
  class="absolute left-0 top-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
  data-te-sidenav-init
  data-te-sidenav-hidden="false"
  data-te-sidenav-position="absolute">   
        <div class='px-4'>

  </div>
  <UserProfile />
  <MultiList/>

    </nav>
  );
};

const sidenavButtonAttributes = {
    'data-te-sidenav-toggle-ref': true,
    'data-te-target': '#sidenav-1',
    'aria-controls': '#sidenav-1',
    'aria-haspopup': true,
  };
