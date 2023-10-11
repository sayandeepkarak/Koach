import {
  Banner,
  BannerArea,
  InformationArea,
  QuoteSection,
} from "./home.styled";
import bannerImg from "../../assets/banner.png";
import { memo, useCallback, useMemo, useState } from "react";
import Header from "../../components/Header";
import { createPortal } from "react-dom";
import LoginForm from "../../components/Forms/loginForm";
import Signupform from "../../components/Forms/signupform";

export type modalState = "login" | "signup" | false;

const Home = () => {
  const [modalStatus, setModalStatus] = useState<modalState>(false);
  const closeModal = useCallback(() => {
    setModalStatus(false);
  }, []);
  const LoginPortal = useMemo(
    () => createPortal(<LoginForm closer={closeModal} />, document.body),
    []
  );
  const SignupPortal = useMemo(
    () => createPortal(<Signupform closer={closeModal} />, document.body),
    []
  );

  return (
    <>
      <Header setModal={setModalStatus} />
      <BannerArea>
        <InformationArea>
          <h1>
            SELECT *<br />
            FROM `<span>World</span>`
            <br />
            WHERE `<span>Someone</span>`
            <br />
            LIKE "<span>You</span>";
          </h1>
          <p onClick={() => setModalStatus("signup")}>Enroll now</p>
        </InformationArea>
        <Banner src={bannerImg} />
      </BannerArea>
      <QuoteSection>
        <div>
          <h3>THE FUNCTION OF</h3>
          <h1>GOOD</h1>
          <h2>SOFTWARE</h2>
          <h3>IS TO MAKE THE</h3>
          <h2>COMPLEX</h2>
          <h3>APPEAR TO BE</h3>
          <h1>SIMPLE</h1>
        </div>
      </QuoteSection>
      {modalStatus === "login" && LoginPortal}
      {modalStatus === "signup" && SignupPortal}
    </>
  );
};

export default memo(Home);
