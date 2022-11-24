import styled, { css } from "styled-components";

const Wrapper = styled.section`
  width: 80%;
  align-self: center;
  text-align: center;
  margin-bottom: 0px;
  h1 {
    font-family: "DM Serif Display";
    font-size: 52px;
    font-weight: 600;
    margin-bottom: 0px;
  }
  h2 {
    font-weight: 100;
    font-style: italic;
    font-size: 16px;
    /* color: gray; */
    color: rgba(102, 153, 204, 0.8);
    margin-bottom: 60px;
  }
`;

/*
Component styling to show underlined headings.
Will animate the underlining of a menu item on mouse over and always
show the underline under the selected item
*/
const NavBar = styled.h2`
  a {
    text-decoration: none;
    position: relative;
    :after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0%;
      width: 0%;
      border-bottom: 2px solid rgba(102, 153, 204, 0.4);
      transition: 0.4s;
    }
    :not(:first-child):before {
      content: " • ";
    }
    :hover:after {
      width: 40% !important;
    }
  }
  a.selected {
    font-weight: 400;
    :after {
      width: 40%;
    }
  }
  :hover a.selected:after {
    width: 0%;
  }
`

interface SmartLinkProps {
  text: String;
  underlined?: boolean;
}

function SmartLink(props: SmartLinkProps) {
  return <a className={props.underlined ? "selected" : undefined}>{props.text}</a>;
}

export default function Header() {
  return (
    <Wrapper>
      <h1>Scott O'Brien</h1>
      <NavBar>
        <SmartLink text="Writings/Projects" underlined />
        <SmartLink text="About" />
        <SmartLink text="BucketList" />
        <SmartLink text="Cooking" />
        <SmartLink text="Flying" />
      </NavBar>
    </Wrapper>
  );
}
