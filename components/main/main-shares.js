import IconButton from "../buttons/button-icon"
import Button from "../buttons/button"
import { useEffect , useState} from "react";

const Main = ({sideNavHidden,setSideNavHidden,children}) => {
  
  useEffect(() => {

  console.log('main--'+sideNavHidden)
    
    //TODO: For reszizng detect screen size and set the follwoing to hidden Set   data-te-sidenav-hidden = 'true'
    // Todo: Use window resize -  see example page
    //if state is hidden then remove the paddinf stuff from #content

    const init = async () => {
      const { initTE} = await import("tw-elements");
      initTE({ });
      // console.log(Sidenav.isVisible)
    };
    init();

    
  }, [sideNavHidden]);

  const handleClick = ()=> setSideNavHidden(!sideNavHidden)

    return (
      <div class={`px-5  flex text-start  text-center ${sideNavHidden  ? "!pl-5":"!pl-[260px]"}`} id="xxxxcontent">
        


<div class="my-2 lg:w-4/5">
 {children}
</div>
<div class='flex justify-center lg:w-1/5 '>

 <div className="h-screen sticky top-0 flex items-center">
   
<ul
  class="mr-4 flex list-none flex-col flex-wrap pl-0 "
  role="tablist"
  data-te-nav-ref>
  <li role="presentation" class="flex-grow text-center">
    <a
      href="#tabs-home03"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-home03"
      data-te-nav-active
      role="tab"
      aria-controls="tabs-home03"
      aria-selected="true"
      >Home</a
    >
  </li>
  <li role="presentation" class="flex-grow text-center">
    <a
      href="#tabs-profile03"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-profile03"
      role="tab"
      aria-controls="tabs-profile03"
      aria-selected="false"
      >Profile</a
    >
  </li>
  <li role="presentation" class="flex-grow text-center">
    <a
      href="#tabs-messages03"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-messages03"
      role="tab"
      aria-controls="tabs-messages03"
      aria-selected="false"
      >Messages</a
    >
  </li>
  <li role="presentation" class="flex-grow text-center">
    <a
      href="#tabs-contact03"
      class="disabled pointer-events-none my-2 block border-x-0 border-b-2 border-t-0 border-transparent bg-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-400 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent dark:text-neutral-600"
      data-te-toggle="pill"
      data-te-target="#tabs-contact03"
      role="tab"
      aria-controls="tabs-contact03"
      aria-selected="false"
      >Contact</a
    >
  </li>

  
</ul>
 </div>


</div>

          </div>
    );
  };

  export default Main;

  const sidenavButtonAttributes = {
    'data-te-sidenav-toggle-ref': true,
    'data-te-target': '#sidenav-2',
    'aria-controls': '#sidenav-2',
    'aria-haspopup': true,
  };