'use client'
import { Dialog, OverlayArrow, Popover} from 'react-aria-components';
import style from"./style.module.css"
export default function NewPopover({children,props}) {

    return ( 
          <Popover {...props} className={style.popover}>
            <OverlayArrow className={style.arrow}>
              <svg width={12} height={12} viewBox="0 0 12 12">
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
            <Dialog className={style.dialog}>
              {children}
            </Dialog>
          </Popover>
        );

}

