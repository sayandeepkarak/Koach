import styled from "styled-components";

export const InputBlock = styled.div`
  width: 100%;
`;

export const ErrorText = styled.p`
  font-size: 0.9rem;
  color: var(--deep);
`;

interface props {
  error: "yes" | "no";
}

export const ModalInputArea = styled.div<props>`
  flex-grow: 2;
  border: 1px solid
    ${({ error }) => (error !== "yes" ? "var(--real-shadow)" : "var(--deep)")};
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem;
  svg {
    color: var(--icon);
  }
  label {
    svg {
      color: ${({ error }) => (error === "yes" ? "var(--deep)" : undefined)};
    }
  }
  label,
  span {
    display: flex;
    cursor: pointer;
  }
  input {
    flex-grow: 1;
    margin-right: 1rem;
    border: none;
    outline: none;
    font-size: 1rem;
    color: var(--icon);
  }
`;

export const SelectInput = styled.select`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--icon);
`;
