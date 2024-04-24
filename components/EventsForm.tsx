"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form,  FormControl, FormDescription, FormField,FormItem, FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"   //npx shadcn ui @latest add input
import * as z from 'zod'
import { formSchema } from "@/lib/validator"
import { eventValues } from "@/constants"
import Dropdown from "@/app/SharedComp/dropdown"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
  import  {FileUploader}  from "@/app/SharedComp/imageUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function EventsForm() {
  const [files,setFiles] = useState([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:   eventValues,})
      // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
    
  return (
    <Form {...form} >
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-12 md:w-[90%] md:mx-auto  w-full">
      <div className="flex flex-col gap-5 md:gap-8 md:flex-row">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem  className="w-full">
            <FormLabel>title</FormLabel>
            <FormControl>
              <Input placeholder="event title" {...field}  className="input-field "/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="categroyId"
        render={({ field }) => (
          <FormItem  className="w-full">
            <FormLabel>Event's Category</FormLabel>
            <FormControl>
              <Dropdown  value={field.value} onChangehandler={field.onChange}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
        <div className="w-full">
           <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl className="text-area h-72">
                <Textarea
                  placeholder="description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
               Enter your event's description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div>
        <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem  className="w-full">
            <FormLabel>Image</FormLabel>
            <FormControl>
              <FileUploader  setFiles={setFiles}  imageUrl={field.value} onFieldChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>
        <div className="w-full">
        <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem  className="w-full">
            <FormLabel>Event's Location</FormLabel>
            <FormControl >
              <div className="flex flex-center pl-[1rem]  bg-grey-50 rounded-full">
              <Image  src='/location.png' alt="location icon" height={20} width={20} className=""/>
              <Input placeholder="event's locatioon" {...field}  className="input-field "/>
                </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-10 md:justify-between">
        <FormField 
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem  className="" >
            <FormLabel>
             </FormLabel>
            <FormControl>
            <div className="flex flex-center bg-grey-50 rounded-full w-full  gap-4 input-field cursor-pointer">
           <Image src="/calendar.png" alt="calendar icon" height={20} width={20} className=""/>
              start date:
           <DatePicker
            selected={field.value} //when day is clicked
            // onSelect={field.value} //when day is clicked
            onChange={(date:Date)=>{field.onChange(date)}} //only when value has changed
            showTimeSelect={true}
            timeFormat="HH:mm"
            timeInputLabel="Time:"
            dateFormat="MMMM d, yyyy h:mm aa"
            
            // wrapperClassName="datePicker"  
            />
           </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel  className="flex flex-row">
          </FormLabel>
            <FormControl>
           <div className="flex flex-center bg-grey-50 rounded-full w-full gap-4 input-field cursor-pointer">
           <Image src="/calendar.png" alt="calendar icon" height={20} width={20} className=""/>
              end date:
           <DatePicker
            selected={field.value} //when day is clicked
            // onSelect={field.value} //when day is clicked
            onChange={(date:Date)=>{field.onChange(date)}} //only when value has changed
            showTimeSelect={true}
            timeFormat="HH:mm"
            timeInputLabel="Time:"
            dateFormat="MMMM d, yyyy h:mm aa"
            // wrapperClassName="datePicker"  
            />
           </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>
      <Button type="submit" className="md:w-[60%] mx-auto">Submit</Button>
    </form>
  </Form>
  )
}

export default EventsForm;