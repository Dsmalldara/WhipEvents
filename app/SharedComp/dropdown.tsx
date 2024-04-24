'use client'
import {  Select, SelectContent, SelectItem, SelectTrigger,SelectValue,SelectGroup, SelectLabel} from "@/components/ui/select"
import { categoryType } from "@/lib/database/models/categoryModel";
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter, AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";

type dropdownProps = {
  value?: string;
  onChangehandler?:()=> void;
}
function dropdown({value, onChangehandler}:dropdownProps) {
  const [category,setCategory]= useState<categoryType[]>([
    {
      _id:"1",
      name:"Music"
    },{
      _id:"2",
      name:"Food"
    },{
      _id:"3",
      name:"Tech"}
  ])
  const handleAddCategory = ()=>{
    console.log("adding new category")
  }
  const [newCategory, setNewCategory] = useState<categoryType>([])
  return (
    <Select  onValueChange={onChangehandler} defaultValue={value}>
    <SelectTrigger className="select-field">
      <SelectValue placeholder="Select a Category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Categories</SelectLabel>
        {
          category.length > 0 && category.map((cat)=>(
            <SelectItem key={cat._id} value={cat._id} className="select-input  p-regular-16">
              {cat.name}
            </SelectItem>
          ))
        }
       <AlertDialog>
  <AlertDialogTrigger className="p-medium-14 pl-8 text-start justify-start w-full py-3 rounded-sm hover:bg-slate-300 text-primary-500 focus:text-primary-500">
    Create new Category?</AlertDialogTrigger>
  <AlertDialogContent className="bg-white  backdrop-filter">
    <AlertDialogHeader>
      <AlertDialogTitle className="p-regular-24">New Category</AlertDialogTitle>
      <AlertDialogDescription>
      <Input className="input-field-2" type="text" placeholder="input new category"/>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>startTransition(handleAddCategory)}>Add</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

export default dropdown