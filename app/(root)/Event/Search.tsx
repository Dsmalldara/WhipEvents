'use client'
import { searchEventsByTitle } from "@/app/api/event.actions"
import {   Command, CommandDialog,  CommandEmpty,  CommandGroup,  CommandInput,CommandItem,CommandList,  CommandSeparator,   CommandShortcut, } from "@/components/ui/command"
import { useEffect, useState } from "react"
import {debounce} from "lodash"
import { handleError } from "@/lib/utils";
import Link from "next/link"
function Search() {
  const [searchText, setSearchText] = useState<string>("")
  const [resultText,setResultText] = useState<any>([])
  const debouncedGetResult = debounce(async () => {
    try {
      if (searchText.length > 1) {
        const result = await searchEventsByTitle(searchText);
        setResultText(result);
      }
    } catch (error) {
      // Handle error
    }
  }, 2000);
  useEffect(() => {
    debouncedGetResult.flush(); // Clear the debounce timer
  }, [searchText]);
   useEffect(()=>{
      debouncedGetResult()
   
   },[searchText])
  console.log(resultText)
  return (
    <div className="  max-w-md w-full">
        <Command>
  <CommandInput placeholder="search for events.." className="text-zinc-500" value={searchText} onValueChange={setSearchText}/>
  <CommandList>
  <CommandEmpty>
  your result would be displayed here {'   '}
    </CommandEmpty>
   {  searchText.length >0 ?(
    <CommandGroup heading="Suggestions">
    {
        resultText.map((result:any)=>(
          <Link href={`/Event/${result._id}`}>
          <CommandItem key={result._id} className="cursor-pointer">
         {result.title}
          </CommandItem>
          </Link>
        ))
      }
    </CommandGroup>
  ) : null}
  </CommandList>
</Command>

    </div>
  )
}

export default Search