import styled from "styled-components";

export const UploadArea = styled.label`
  background-color: var(--bluish-shadow-one);
  width: 16rem;
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  user-select: none;
  & > svg {
    font-size: 6.5rem;
    color: var(--bluish-shadow-two);
  }
  img {
    width: auto;
    height: 100%;
    max-width: 16rem;
    max-height: 11rem;
  }
`;

export const UploadIndicator = styled.div`
  background-color: var(--bluish);
  width: 100%;
  display: inherit;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0rem;
  color: var(--white);
  svg {
    color: var(--white);
  }
  p {
    font-size: 0.8rem;
  }
`;
