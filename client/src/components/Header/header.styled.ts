import styled from "styled-components";

export const NavBar = styled.header.attrs<any>({})`
  width: 100%;
  height: 7.3rem;
  padding: 0.8rem 3.5rem;
  border-bottom: 0.4rem solid var(--deep);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img.attrs({ alt: "x" })`
  height: 100%;
  width: auto;
  transform: translateX(-0.4rem);
`;

export const AuthButtonWrap = styled.div`
  display: flex;
  gap: 0.6rem;
`;

type btnProp = {
  bg?: string;
};

export const AuthButton = styled.button.attrs({})<btnProp>`
  border-radius: 0;
  border: none;
  background-color: ${(props) => props.bg};
  color: var(--white);
  padding: 0.7rem 0rem;
  width: 6rem;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 0.02rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.8;
    cursor: default;
  }
`;
