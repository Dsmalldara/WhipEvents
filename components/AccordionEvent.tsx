import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import React from 'react'

function AccordionEvent() {
    type Reason = {
        title: string;
        explanation: string;
    };
    
    const reasons: Reason[] = [
        {
            title: "Comprehensive Free Features",
            explanation: "WhipEvents offers a wide range of features at no cost, unlike many other event apps. From ticketing to promotions, you get everything you need to manage your events efficiently without hidden fees, making it a cost-effective choice for event organizers."
        },
        {
            title: "No Fees for Free Events",
            explanation: "With WhipEvents, you can host free events without incurring any fees. This makes it ideal for community gatherings, charity events, or any free-to-attend activities. Enjoy the freedom to create and manage events without worrying about unexpected costs."
        },
        {
            title: "Easy Fee Management for Paid Events",
            explanation: "WhipEvents simplifies fee management for paid events. You can easily pass ticket fees to your buyers, ensuring transparent pricing and straightforward budgeting. This flexibility helps you maximize your revenue while keeping your event finances clear and manageable."
        },
        {
            title: "Exceptional Customer Support",
            explanation: "WhipEvents provides outstanding customer support for events of all sizes and types. Our dedicated team is always available to assist with any questions or issues, ensuring your event runs smoothly and your attendees have the best possible experience."
        }
    ];
    
  return (
  <section className="w-full px-4 md:w-[60%] mx-auto mt-6 md:mt-4">
   <div className="flex gap-5">
   <h2 className="text-center p-bold-20 md:h4-medium font-ojuju py-4">
    Discover Why WhipEvents Stands Out!
    </h2>
    <img alt="use whipevents " src="/c1.png" className="w-[6rem] h-[6rem]"/>
   </div>
      <div className="">
    {
        reasons.map((reason, index) => (
            <Accordion key={index} type="multiple" className="">
                <AccordionItem value={index.toString()}> 
                    <AccordionTrigger className="">
                        {reason.title}
                    </AccordionTrigger>
                    <AccordionContent className="md:text-[1.2rem] text-sm leading-8 font-light">
                        {reason.explanation}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ))
    }
    </div>
  </section>
  )
}

export default AccordionEvent  