import IconButton from "../buttons/button-icon"
import Button from "../buttons/button"
import { useEffect , useState} from "react";

const Main = ({sideNavHidden,setSideNavHidden}) => {
  
  useEffect(() => {

  console.log('main--'+sideNavHidden)
    
    //TODO: For reszizng detect screen size and set the follwoing to hidden Set   data-te-sidenav-hidden = 'true'
    // Todo: Use window resize -  see example page
    //if state is hidden then remove the paddinf stuff from #content
  }, [sideNavHidden]);

  const handleClick = ()=> setSideNavHidden(!sideNavHidden)

    return (
<div class={`p-5  text-center ${sideNavHidden  ? "!pl-5":"!pl-[260px]"}`} id="content">
  <IconButton />
  <Button type='primary' dataAttributes={sidenavButtonAttributes} onClick={handleClick}>Test</Button>

  <div class="my-5 flex text-start">
    Main ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc magna
    massa, ornare quis interdum a, cursus in quam. Quisque risus libero,
    cursus eget eros vitae, aliquam placerat velit. Vivamus luctus eros id
    sagittis luctus. Pellentesque felis nulla, rhoncus viverra nunc vitae,
    viverra aliquam ante. Ut feugiat mattis tempor.
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