'use client'
import {Button, DialogTrigger,  Switch} from 'react-aria-components';
import Popover from './popover';
export default function UiComponents() {

  
   
    return ( 
        <DialogTrigger>
        <Button>Settings</Button>
        <Popover>
            <div className="flex-col">
              <Switch defaultSelected>
                <div className="indicator" /> Wi-Fi
              </Switch>
              <Switch defaultSelected>
                <div className="indicator" /> Bluetooth
              </Switch>
              <Switch>
                <div className="indicator" /> Mute
              </Switch>
            </div>
        </Popover>
      </DialogTrigger>
      )


}

// https://react-spectrum.adobe.com/react-aria/Popover.html