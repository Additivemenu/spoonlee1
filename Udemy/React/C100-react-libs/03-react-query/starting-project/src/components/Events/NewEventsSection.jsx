import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { max: 3 }], // used internally by react-query to identify the query for caching ...
    queryFn: ({ signal, queryKey }) => {
      return fetchEvents({ signal, ...queryKey[1] });
    }, // ! react-query by default passes some arguments to the queryFn, like queryKey, queryClient, etc.
    staleTime: 5000, // this is default 0, which means it will always refetch the data even with the cache in use, we now set it to 5 s so that it will refetch the data after 5 minutes
    // gcTime: 1000  // garbage collection time, actually the TTL of the cached data
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch event"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}

/**
 *  traditional ways to do data fetching in React
 */
// export default function NewEventsSection() {
//   const [data, setData] = useState();
//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:3000/events');

//       if (!response.ok) {
//         const error = new Error('An error occurred while fetching the events');
//         error.code = response.status;
//         error.info = await response.json();
//         throw error;
//       }

//       const { events } = await response.json();

//       return events;
//     }

//     fetchEvents()
//       .then((events) => {
//         setData(events);
//       })
//       .catch((error) => {
//         setError(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, []);

//   let content;

//   if (isLoading) {
//     content = <LoadingIndicator />;
//   }

//   if (error) {
//     content = (
//       <ErrorBlock title="An error occurred" message="Failed to fetch events" />
//     );
//   }

//   if (data) {
//     content = (
//       <ul className="events-list">
//         {data.map((event) => (
//           <li key={event.id}>
//             <EventItem event={event} />
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   return (
//     <section className="content-section" id="new-events-section">
//       <header>
//         <h2>Recently added events</h2>
//       </header>
//       {content}
//     </section>
//   );
// }
