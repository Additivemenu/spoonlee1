import styled from "styled-components";

const Wrapper = styled.div`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
`;

// should be a wrapper component
const Card = (props) => {
  return <Wrapper className={props.className}>{props.children}</Wrapper>;
};

export default Card;
