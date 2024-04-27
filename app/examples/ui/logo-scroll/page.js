"use client";
import {
  Header,
  ListBox,
  ListBoxItem,
  Section,
  Text,
} from "react-aria-components";

//codepen.io/Coding_Journey/pen/yWjWKd

import Image from "next/image";
import test from "./im1.jpg";

export default function InfinteScroll() {
  return (
    <div className="marquee">
      <ListBox
        aria-label="Albums"
        orientation="horizontal"
        selectionMode="multiple"
        className="marquee-content"
      >
        <ListBoxItem className="marquee-contentItem">
          <Image
            src="/images/im1.jpg"
            fill={true}
            alt="Picture of the author"
          />
        </ListBoxItem>
        <ListBoxItem className="marquee-contentItem">
          <Image
            src="/images/im1.jpg"
            fill={true}
            alt="Picture of the author"
          />
        </ListBoxItem>
        <ListBoxItem className="marquee-contentItem">
          <Image
            src="/images/im1.jpg"
            fill={true}
            alt="Picture of the author"
          />
        </ListBoxItem>
        <ListBoxItem className="marquee-contentItem">
          <Image
            src="/images/im1.jpg"
            fill={true}
            alt="Picture of the author"
          />
        </ListBoxItem>
      </ListBox>
    </div>
  );
}
