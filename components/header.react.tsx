import styled from 'styled-components';

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

const AnimatedLink = styled.a`
  text-decoration: none;
  position: relative;
  :after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 0%;
    border-bottom: 2px solid rgba(102, 153, 204, 0.4);
    transition: 0.4s;
  }
  :hover:after {
    width: 40%;
  }
`;

const SelectedLink = styled(AnimatedLink)`
  :after {
    width: 40%;
  }
`;

interface SmartLinkProps {
  text: string;
  underlined?: boolean;
}

function SmartLink(props: SmartLinkProps) {
  if (props.underlined) {
    return <SelectedLink>{props.text}</SelectedLink>;
  }
  return <AnimatedLink>{props.text}</AnimatedLink>;
}

export default function Header() {
  return (
    <Wrapper>
      <h1>Scott O&apos;Brien</h1>
      <h2>
        <SmartLink text="Writings/Projects" underlined />&nbsp;&#x2022;&nbsp;
        <SmartLink text="About" />&nbsp;&#x2022;&nbsp;
        <SmartLink text="Bucket List" />&nbsp;&#x2022;&nbsp;
        <SmartLink text="Cooking" />&nbsp;&#x2022;&nbsp;
        <SmartLink text="Flying" />
      </h2>
    </Wrapper>
  );
}
