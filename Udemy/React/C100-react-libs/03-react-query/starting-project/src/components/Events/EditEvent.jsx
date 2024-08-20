import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id], // ! note we use the same query key as in EventDetails.jsx as the data we want is the same so we can reuse the data
    queryFn: ({ signal }) => {
      return fetchEvent({ id: params.id, signal });
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (submittedData) => {
      // onMutate is a function that gets executed before the mutation is executed
      // the argument is the data that is passed to the mutate function

      const newEvent = submittedData.event;
      await queryClient.cancelQueries({ queryKey: ["events", params.id] }); // ! cancel the query (not mutation) to prevent the cache from being updated with the new data
      const previousEvent = queryClient.getQueryData(["events", params.id]); // ! get the current event data from the cache for rollback
      queryClient.setQueryData(["events", params.id], newEvent); // ! update the cache with the new event data

      return { previousEvent }; // this makes context.previousEvent available in onError and onSettled callbacks
    },
    onError: (error, data, context) => {
      // onError is a function that gets executed when the mutation fails
      queryClient.setQueryData(["events", params.id], context.previousEvent); // ! rollback the cache to the previous event data
    },
    onSettled: () => {
      // onSettled is a function that gets executed after the mutation is executed, no matter if it is successful or not
      queryClient.invalidateQueries({ queryKey: ["events", params.id] }); // ! invalidate the query to refetch the data from the server
    },
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });

    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <p>Loading event data...</p>
      </div>
    );
  }
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
