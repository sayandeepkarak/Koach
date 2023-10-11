import styled from "styled-components";

export const BannerArea = styled.section`
  min-height: calc(100vh - 7.3rem);
  height: calc(100vh - 7.3rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 3.8rem;
`;

export const InformationArea = styled.div`
  min-height: max-content;
  height: 100%;
  width: 50%;
  background-color: var(--bluish);
  padding: 1.5rem 3%;
  h1 {
    font-size: 4rem;
    color: var(--white);
    span {
      color: #f7e987;
    }
  }
  p {
    color: var(--white);
    text-decoration: underline;
    font-size: 1.7rem;
    letter-spacing: 0.01rem;
    margin-top: 1rem;
    cursor: pointer;
    width: max-content;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Banner = styled.img.attrs({ alt: "x" })`
  height: 88%;
  width: auto;
  border: 1rem groove var(--deep);
`;

export const QuoteSection = styled.section`
  margin: 2rem 7.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--deep);
    padding: 3rem 9rem;
    color: var(--white);
    font-size: 140%;
  }
`;
