import { Dialog,OverlayArrow, Popover as AriaPopover } from 'react-aria-components';
import styles from "./Popover.module.css";

function Popover({ children, ...props }) {
  return (
    <AriaPopover {...props} className={styles.popover}>
      <OverlayArrow className={styles.overlayArrow}>
        <svg width={12} height={12} viewBox="0 0 12 12">
          <path d="M0 0 L6 6 L12 0" />
        </svg>
      </OverlayArrow>
      <Dialog className='styles.dialog'>
        {children}
      </Dialog>
    </AriaPopover>
  );
}

export default  Popover