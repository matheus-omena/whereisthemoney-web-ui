import DefaultTransition from "../../components/General/DefaultTransition";
import HeroSection from "./HeroSection/HeroSection";
import Section2 from "./HeroSection/Section2";
import Section3 from "./HeroSection/Section3";

export default function LandingPage() {
    return (
        <DefaultTransition>
            <HeroSection />
            <Section2 />
            <Section3 />
        </DefaultTransition>
    )
}