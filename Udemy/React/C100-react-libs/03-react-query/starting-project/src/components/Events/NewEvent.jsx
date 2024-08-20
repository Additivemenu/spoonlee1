import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { createNewEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();

  // note of course you can also use useQuery to post data to server since queryFn is just a function,
  // but this is not recommended, because useQuery is designed for fetching data, not for posting data,
  // certain behaviours of useQuery are not suitable for posting data, like refetching the data when the query key changes, fetch data on component mount, etc.
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      // only get executed when the mutation is successful

      // by default, the exact option is false, which means that the query key is matched partially (as long as the queryKey contains "events", it is matched)
      queryClient.invalidateQueries({
        queryKey: ["events"],
        // exact: true
      }); // ! this invalidation tells react-query that the query data matched with the key is stale, so that it will refetch the data

      navigate("/events");
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting"}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>

      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            "Fail to create event, please try again later"
          }
        />
      )}
    </Modal>
  );
}
