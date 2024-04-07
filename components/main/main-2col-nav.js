import IconButton from "../buttons/button-icon"
// import Button2 from "../buttons/button"
import { useEffect , useState} from "react";
import { Item, useSelectState } from "react-stately";

  import {
    Button,
    Label,
    ListBox,
    ListBoxItem,
    Popover,
    Select,
    SelectValue,
  } from "react-aria-components";

import {
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Modal,
  TextField,
} from "react-aria-components";

const Main = ({sideNavHidden,setSideNavHidden}) => {
  let [majorId, setMajorId] = useState(null);

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
      <div
        class={`px-5  flex text-start  text-center ${
          sideNavHidden ? "!pl-5" : "!pl-[260px]"
        }`}
        id="xxxxcontent"
      >
        <div class="my-2 lg:w-4/5">
          <div
            class=" opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block py-20"
            id="tabs-home03"
            data-te-tab-active
          >
            <Select onSelectionChange={(selected) => alert(selected)}>
              <Label>Favorite Animal</Label>
              <Button>
                <SelectValue />
                <span aria-hidden="true">▼</span>
              </Button>
              <Popover>
                <ListBox>
                  <ListBoxItem id="a">Aardvark</ListBoxItem>
                  <ListBoxItem id="b">Cat</ListBoxItem>
                  <ListBoxItem id="c">Dog</ListBoxItem>
                  <ListBoxItem id="d">Kangaroo</ListBoxItem>
                  <ListBoxItem id="e">Panda</ListBoxItem>
                  <ListBoxItem id="f"> Snake</ListBoxItem>
                </ListBox>
              </Popover>
            </Select>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
              porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
              ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
              imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
              ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
              tellus eget condimentum rhoncus, sem quam semper libero, sit amet
              adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
              pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
              tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam
              quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
              leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
              magna. Sed consequat, leo eget bibendum sodales, augue velit
              cursus nunc,
            </p>
          </div>

          <div
            class=" opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block py-20"
            id="tabs-profile03"
          >
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
            ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
            nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
            nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
            condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem
            neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
            Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
            Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
            fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
            consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </div>
          <div
            class=" opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block py-20"
            id="tabs-messages03"
          >
            xxxxxxxxxxxxxxxxxxxxxxLorem ipsum dolor sit amet, consectetuer
            adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
            pretium quis, sem. Nulla consequat massa quis enim. Donec pede
            justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
            justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
            dictum felis eu pede mollis pretium. Integer tincidunt. Cras
            dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
            tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
            ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
            tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
            rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
            ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
            tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel,
            luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
            tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
            Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
            Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
            magna. Sed consequat, leo eget bibendum sodales, augue velit cursus
            nunc,
          </div>
          <div
            class=" opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block py-20"
            id="tabs-contact03"
          >
            Tab 4 content
            <DialogTrigger>
              <Button>Sign up…</Button>
              <Modal>
                <Dialog>
                  {({ close }) => (
                    <form>
                      <Heading slot="title">Sign up</Heading>
                      <TextField autoFocus>
                        <Label>First Name</Label>
                        <Input />
                      </TextField>
                      <TextField>
                        <Label>Last Name</Label>
                        <Input />
                      </TextField>
                      <Button onPress={close} style={{ marginTop: 8 }}>
                        Submit
                      </Button>
                    </form>
                  )}
                </Dialog>
              </Modal>
            </DialogTrigger>
          </div>
        </div>
        <div class="flex justify-center lg:w-1/5 ">
          <div className="h-screen sticky top-0 flex items-center">
            <ul
              class="mr-4 flex list-none flex-col flex-wrap pl-0 "
              role="tablist"
              data-te-nav-ref
            >
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
                >
                  Home
                </a>
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
                >
                  Profile
                </a>
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
                >
                  Messages
                </a>
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
                >
                  Contact
                </a>
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