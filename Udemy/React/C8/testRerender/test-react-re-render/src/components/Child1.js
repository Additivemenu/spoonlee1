const Child1 = (props) => {
  console.log("child1 re-rendered!");

  return <p>{props.parentState}</p>;
};

export default Child1;
