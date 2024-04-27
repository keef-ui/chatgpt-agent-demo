export default function Card({children,tclass}) {
        const tstyle = `border border-gray p-6 h-full rounded ${tclass}`;
    return (
         <div class={tstyle}>
     {children}
   </div>
    )
  }