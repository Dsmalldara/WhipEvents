'use client'
import {   Command, CommandDialog,  CommandEmpty,  CommandGroup,  CommandInput,CommandItem,CommandList,  } from "@/components/ui/command"
import { useEffect, useState } from "react"
import { handleError } from "@/lib/utils";
import Link from "next/link"
import { searchEventsByTitle } from "@/app/api/event.actions";
import { useDebounce } from 'use-debounce';
function Search() {
  // const [searchText, setSearchText] = useState<string>("")
  // const [resultText,setResultText] = useState<any>([])
  // const [debouncedSearchText] = useDebounce(searchText, 3000); // Debounce search text

  // useEffect(() => {
  //   const getSearch = async () => {
  //     console.log('Fetching search results...');
  //     try {
  //       const result = await searchEventsByTitle(debouncedSearchText); // Use debounced search text
  //       setResultText(result);
  //         if(debouncedSearchText.length <1){
  //           setResultText(null) }
  //     } catch (error) {
  //       handleError(error);
  //     }  
  //   };
  //     getSearch();
  // }, [debouncedSearchText]); // Trigger effect on debounced search text
  return (
    <div className="  max-w-md w-full">
        <Command>
  <CommandInput placeholder="search for events.." className="text-zinc-500" value={searchText} onValueChange={setSearchText}/>
  <CommandList>
  <CommandEmpty>
  your result would be displayed here {'   '}
    </CommandEmpty>
   {/* {   resultText?.length>0 ?(
    <CommandGroup heading="Suggestions">
    {
       resultText.map((result:any)=>(
          <Link href={`/Event/${result._id}`} key={result._id}>
          <CommandItem key={result._id} className="cursor-pointer">
         {result.title}
          </CommandItem>
          </Link>
        ))
      }
    </CommandGroup>
  ) : null} */}
  </CommandList>
</Command>

    </div>
  )
}

export default Search