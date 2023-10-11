import { NavBar, Logo, AuthButton, AuthButtonWrap } from "./header.styled";
import logo from "../../assets/koach.png";
import { memo } from "react";
import { modalState } from "../../pages/Home";

interface props {
  setModal: React.Dispatch<React.SetStateAction<modalState>>;
}

const Header = ({ setModal }: props) => {
  return (
    <NavBar>
      <Logo src={logo} />
      <AuthButtonWrap>
        <AuthButton bg={"var(--bluish)"} onClick={() => setModal("login")}>
          Login
        </AuthButton>
        <AuthButton bg={"var(--deep)"} onClick={() => setModal("signup")}>
          Signup
        </AuthButton>
      </AuthButtonWrap>
    </NavBar>
  );
};

export default memo(Header);
