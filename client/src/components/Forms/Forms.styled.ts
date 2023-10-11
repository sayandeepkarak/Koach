import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--real-shadow);
  display: grid;
  place-items: center;
  padding: 4rem 0rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  display: grid;
  background: transparent;
  border: none;
  outline: none;
  top: 1.3rem;
  cursor: pointer;
  right: 1.3rem;
  svg {
    font-size: 2rem;
  }
`;

export const ModalSection = styled.div`
  position: relative;
  min-width: 30rem;
  min-height: 12rem;
  height: auto;
  background-color: var(--white);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeader = styled.h1`
  color: var(--shadow-text);
  margin-bottom: 1.5rem;
  user-select: none;
`;

export const ModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ModalInputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  width: 100%;
`;

export const ModalBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: var(--icon);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
