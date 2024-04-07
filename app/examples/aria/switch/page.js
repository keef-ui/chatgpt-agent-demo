'use client'
import {Switch} from 'react-aria-components';
import style from "./style.module.css"

export default function () {
    return (
        <div className="flex-col">
            <Switch defaultSelected className={style.switch}>
                <div className={style.indicator} /> Wi-Fi
            </Switch>
            <Switch defaultSelected className={style.switch}>
                <div className={style.indicator} /> Bluetooth
            </Switch>
            <Switch className={style.switch}>
                <div className={style.indicator} /> Mute
            </Switch>
        </div>
    );
}