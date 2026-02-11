import HeaderOne from "@/layouts/Headers/HeaderOne";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best property website in Kuala lumpur, Malaysia",
};

const Home = () => {
  return (
    <>
      <Wrapper>
        <HeaderOne />
        <main>
          <HomeOnePage />
        </main>
        <BackToTop />
        <CommonFooter />
      </Wrapper>
    </>
  );
};

export default Home;
