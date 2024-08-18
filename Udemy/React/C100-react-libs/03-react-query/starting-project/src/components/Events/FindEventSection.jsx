import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  /**
   *  isLoading will not be true if the query if disabled
   *  but isPending will be true even if the query is disabled
   */
  const { data, isLoading, isError, error } = useQuery({
    // ! dynamic query key -> react-query will refetch the data when the query key changes
    queryKey: ["events", { search: searchTerm }],  // used internally by react-query to identify the query for caching ... 
    queryFn: ({ signal }) => {
      // react-query by default passes some arguments to the queryFn, like queryKey, signal...
      return fetchEvents({ signal, searchTerm });
    },
    enabled: searchTerm !== undefined, // ! note this! we set searchTerm to undefined initially, so that the query is not enabled initially; but even if the searchTerm is set to "", then the query is enabled
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events"}
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
