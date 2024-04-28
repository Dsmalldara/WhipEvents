import EventsForm from "@/components/EventsForm";
function createEvent() {
  return (
    <>
    <section className="bg-primary-50 w-full bg-dotted-pattern  bg-cover bg-center pt-3 md:py-8 shadow-sm rounded-sm">
      <h3 className="wrapper h3-bold text-center sm:text-left">
        Create Event
      </h3>
    </section>
    <div className="wrapper py-5 shadow-sm bg-[#d3cdcd]">
      <EventsForm/>
    </div>
    </>
  )
}

export default createEvent