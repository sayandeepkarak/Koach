import { ComponentType, FC, MouseEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  CloseButton,
  ModalHeader,
  ModalSection,
  ModalWrapper,
} from "../components/Forms/Forms.styled";

export interface modalProps {
  closer: Function;
}

export const withModalHolder = (
  Modal: ComponentType<modalProps>,
  title: string
): FC<modalProps> => {
  const ModalWithWrapper: FC<modalProps> = ({ closer }: modalProps) => {
    const closeModal = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      e.stopPropagation();
      closer();
    };

    const sectionClick = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };
    return (
      <ModalWrapper onClick={closeModal}>
        <ModalSection onClick={sectionClick}>
          <CloseButton onClick={closeModal}>
            <CloseIcon htmlColor="var(--icon)" />
          </CloseButton>
          <ModalHeader>{title}</ModalHeader>
          <Modal closer={closer} />
        </ModalSection>
      </ModalWrapper>
    );
  };
  return ModalWithWrapper;
};
