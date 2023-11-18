import IconButton from "./buttons/button-icon"
import Button from "./buttons/button"

const Main = () => {
    return (
<div class="p-5 !pl-[260px] text-center" id="content">


<IconButton />
<Button type='primary' dataAttributes={sidenavButtonAttributes}>Test</Button>

<div class="my-5 flex text-start">
  xxMain ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc magna
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