import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import EventCollection from "./Event/EventCollection";
import { fetchAllEvents } from "../api/event.actions";
import Search from "./Event/Search";
export default async function Home() {
  const emojis = ["😊"];
  const events = await fetchAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 9,
  });

  return (
    <>
      <section className="bg-primary-50  py-4 md:py-7  bg-contain">
        {/* wrapper makes sure that the content doesnt expand past it normal size */}
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 ">
          <div className="flex flex-col px-6 justify-center relative">
            <Image
              src="/Pattern2.png"
              alt="pattern for home "
              width={80}
              height={80}
              className=" overflow-auto pb-1"
            />
            <h1 className="headertext h1-bold ">
              Check out various events like
              <span className=" pl-2 text-blue-400">Concerts,</span>
              <span className="text-blue-400   pl-2 pr-2"> Conferences</span>
              on our platform
            </h1>
            <p className="p-regular-16 text-gray-600 md:p-regular-24 mt-4 header-p">
              Let's make every heartbeat count, every laugh echo, and every
              moment unforgettable. Begin your journey with WhipEvents today❗️{" "}
              {emojis}
            </p>
            <Button
              size="lg"
              asChild
              className="shadow-md mt-4 w-full button sm:w-fit"
            >
              <Link href="#events">Explore Events</Link>
            </Button>
            <Image
              src="/Line 13.png"
              alt="elipse  for header section"
              height={65}
              width={65}
              className="absolute bottom-[14rem]  md:bottom-[8rem] md:left-[1.4rem] left-[-0.4rem] overflow-hidden"
            />
            <Image
              src="/Pattern2.png"
              alt="pattern for home "
              width={70}
              height={70}
              className="absolute rotate-[345deg] bottom-[50%] right-[10%]"
            />
          </div>
          <div className="relative   w-[300px] h-[27rem] ml-auto mr-[3rem] md:mr-[4rem]">
            {/* <div className="relative "> */}
            <Image
              src="/heroImg.png"
              alt="hero section image for events app"
              width={350}
              height={300}
              className=" rounded-md  max-w-[70vh] md:h-[70vh] justify-center mx-auto object-center object-contain 2xl:max-h-[50vh] md:shadow-none shadow "
            />
            <div className=" before:absolute  before:top-[0%] md:before:top-[1.8%]  before:right-[100%] before:h-[4.5rem] before:w-[4.5rem] firstShape">
              {/* <Image  src='/Ellipse 83.svg' alt="elipse  for header section" height={50} width={45} /> */}
            </div>
            <div className=" after:absolute after:bottom-[4%] md:after:bottom-[0.2rem]  after:right-[101%] after:h-[4.5rem] after:w-[4.2rem] after:rotate-[270deg] secondShape">
              {/* <Image  src='/Ellipse 83.svg' alt="elipse  for header section" height={50} width={45} /> */}
            </div>
            {/* </div> */}
            //
            <Image
              src="/whitePattern.svg"
              alt="white pattern  for header section"
              height={55}
              width={55}
              className="absolute bottom-[15%] md:left-[18%] left-[3%]"
            />
            {/* <Image  src='/Ellipse 84.svg' alt="elipse  for header section" height={50} width={45} className="absolute bottom-[0.1rem] md:bottom-[2rem] md:right-[15%] right-[1%] "/> */}
          </div>
        </div>
        <div className="flex-center flex-col">
          <p className="p-regular-16 text-darkenedGray-50">scroll to explore</p>
          <Image
            src="/Vector.svg"
            alt="elipse  for header section"
            height={25}
            width={15}
            className=""
          />
        </div>
      </section>
      <section
        id="events"
        className=" flex flex-col bg-primary-50 py-8 wrapper gap-8 md:gap-12 md:px-4"
      >
        <h2 className="h2-medium  px-[0.1rem] footer-font">
          Trusted by
          <br />
          thousands of Organizers
        </h2>
        {/* <div className="flex w-full flex-col md:flex-row gap-5 "> */}
        <div className="items-center justify-center flex">
          <Search />
        </div>
        {/* Categories */}
        {/* </div> */}
        <EventCollection
          data={events?.data}
          emptyTitle="No Events Available"
          emptyStateSummary="No events available check later"
          eventCollectionType="All_events"
          limit={10}
          page={1}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
