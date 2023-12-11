import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // hooks ==========================================
  const events = useLoaderData(); // here react router will automatically resolve the promise returned by the loader function

  // jsx ============================================
  return <>{<EventsList events={events} />}</>;
}

export default EventsPage;

// ! the loader function that will be used when registering this page
export async function loader() {
  const response = await fetch("http://localhost:8080/events"); // send to dummy backend

  if (!response.ok) {
    // ...
  } else {
    const resData = await response.json();
    return resData.events; // this is the data that will be passed to the EventsPage component by react router
  }
}
