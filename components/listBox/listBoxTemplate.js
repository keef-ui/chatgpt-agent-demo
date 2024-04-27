import {
  Collection,
  Header,
  ListBox as ListBoxAria,
  ListBoxItem,
  Section,
  Text,
} from "react-aria-components";


  let items = [
    { id: 1, name: 'Aardvark',username: 'Aardvark'  },
    { id: 2, name: 'Cat',username: 'Aardvark'  },
    { id: 3, name: 'Dog',username: 'Aardvark'  },
    { id: 4, name: 'Kangaroo' ,username: 'Aardvark' },
    { id: 5, name: 'Koala' ,username: 'Aardvark' },
    { id: 6, name: 'Penguin',username: 'Aardvark'  },
    { id: 7, name: 'Snake',username: 'Aardvark'  },
    { id: 8, name: 'Turtle',username: 'Aardvark'  },
    { id: 9, name: 'Wombat',username: 'Aardvark'  }
  ];

export default function ListBox() {
  return (
    <div className=" flex justify-center">
      <ListBoxAria
        aria-label="Contacts"
        selectionMode="multiple"
        selectionBehavior="replace"
        className="w-full max-h-[290px] overflow-auto outline-none bg-white text-gray-700 p-2 flex flex-col gap-2 rounded-lg shadow scroll-pb-2 scroll-pt-7"
      >
        <ContactSection title="Favorites" items={items}>
          {(item) => <Contact item={item} />}
        </ContactSection>
      </ListBoxAria>
    </div>
  );
}

function ContactSection({ title, children, items }) {
  return (
    <Section>
      <Header className="sticky -top-2 bg-white z-10 font-bold f px-2 mb-1 text-slate-700">
        {title}
      </Header>
      <Collection items={items}>{children}</Collection>
    </Section>
  );
}

function Contact({ item }) {
  return (
    <ListBoxItem
      id={item.id}
      textValue={item.name}
      className="group relative py-1 px-2 outline-none cursor-default grid grid-rows-2 grid-flow-col auto-cols-max gap-x-3 rounded selected:bg-blue-500 text-slate-700 selected:text-white selected:[&:has(+[data-selected])]:rounded-b-none [&[data-selected]+[data-selected]]:rounded-t-none focus-visible:ring-2 ring-offset-2 ring-blue-500"
    >
  
      <Text slot="label" className="truncate">
        {item.name}
      </Text>
      <Text
        slot="description"
        className="truncate text-sm text-slate-600 group-selected:text-white"
      >
        {item.username}
      </Text>
      <div className="absolute left-0 right-2 bottom-0 h-px bg-gray-200 group-selected:bg-blue-400 [.group[data-selected]:has(+:not([data-selected]))_&]:hidden [.group:not([data-selected]):has(+[data-selected])_&]:hidden [.group[data-selected]:last-child_&]:hidden" />
    </ListBoxItem>
  );
}
