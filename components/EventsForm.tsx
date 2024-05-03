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
import { Checkbox } from "@/components/ui/checkbox"
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from "@/lib/uploadthing"
import { EventTypes } from "@/lib/database/models/eventModel"
import {useRouter} from 'next/navigation'
import { createEvent } from "@/app/api/event.actions"
import { toast } from 'react-hot-toast';

type eventFormType = {
  event:  EventTypes,
  // eventId?:string,
  type:'create'|'update',
  loggedInUserId:any // Specify the type argument for the Array type.
}
 function EventsForm({ event, type = 'create',loggedInUserId}: eventFormType) {
  const [files,setFiles] = useState([])
  const initialValues = event && type === 'update' 
  ? { 
    ...event, 
    startDateTime: new Date(event.startDateTime), 
    endDateTime: new Date(event.endDateTime) 
  }
  : eventValues;
  const router = useRouter();
    const {startUpload} = useUploadThing("imageUploader")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:  initialValues})
        console.log(type)
async  function onSubmit(values: z.infer<typeof formSchema>) {
  let uploadImage = values.imageUrl
  if(files.length > 0 ){
    const uploadedImages = await startUpload(files)
    if(!uploadedImages){
      return
    }
    uploadImage =  uploadedImages[0].url
}
  if (type === 'create'){
   try{
    const newEvent = await createEvent({
      event: { ...values, imageUrl: uploadImage },
      loggedInUserId
    });
    if (newEvent) {
      form.reset();
      // router.push(`/events/${newEvent._id}`)
      toast.success('Event created successfully')
    }
   }
   catch(error){
    console.log(error)
   }
} 
}
console.log(event)
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
        name="categoryId"
        render={({ field }) => (
          <FormItem  className="w-full">
            <FormLabel>Event's Category</FormLabel>
            <FormControl>
              <Dropdown  value={field.value} onChangeHandler={field.onChange}  />
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
            <FormLabel>Event's Location i.e online</FormLabel>
            <FormControl >
              <div className="flex flex-center pl-[1rem]  bg-grey-50 rounded-full">
              <Image  src='/location.png' alt="location icon" height={20} width={20} className=""/>
              <Input placeholder="event's location" {...field}  className="input-field "/>
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
            <FormControl>
            <div className="flex flex-center bg-grey-50 rounded-full w-full  gap-2 [x-4 pr-2] input-field cursor-pointer">
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
            <FormControl>
           <div className="flex flex-center bg-grey-50 rounded-full w-full gap-2 input-field cursor-pointer px-4 pr-2">
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
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 ">
       <div className="flex flex-row bg-grey-50 w-full items-center rounded-full ">
       <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem  className="w-full">
            <FormControl>
             <div className="flex flex-center pl-[1rem]  bg-grey-50 rounded-full">
              <Image  src='/dollar-symbol.png' alt="price icon" height={20} width={20} className=""/>
              <Input placeholder="event price" {...field} type="number" className="bg-grey-50 w-[80%] input-field-3 p-regular-16"/>
                </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="isFree"
        render={({ field }) => (
          <FormItem  className="">
            <FormControl>
            <div className="flex items-center space-x-2">
            <Checkbox id="isFree" 
      onCheckedChange={field.onChange}
      checked={field.value}
      />
            <Label
        htmlFor="isFree"
        className="text-sm font-[300] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap pr-4">
        Free event
      </Label>
    </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       </div>
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem  className="w-full">
            <FormControl>
            <div className="flex flex-center pl-[1rem]  bg-grey-50 rounded-full">
              <Image  src='/link.png' alt="link icon" height={20} width={20} className=""/>
              <Input placeholder="link to organizer's info" {...field}  type="string" className="input-field p-regular-16"/>
                </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>
      <Button type="submit" className="md:w-[60%] mx-auto"
      disabled={form.formState.isSubmitting}
      size="lg"

      >
        {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Event `}
      </Button>
    </form>
  </Form>
  )
}


export default EventsForm;
