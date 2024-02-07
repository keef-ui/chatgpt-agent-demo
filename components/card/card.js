export default function Card({children,tclass}) {
        const tstyle=`block   p-3  dark:bg-neutral-700 ${tclass}`
    return (<div class={tstyle}>
         <div class=' border border-gray p-6 h-full rounded'>
     {children}
   </div>
    </div>)
  }