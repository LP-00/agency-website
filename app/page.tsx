import { MotionDirector } from "@/components/MotionDirector";
import { AgencyProvider } from "@/components/AgencyProvider";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { WhyUs } from "@/components/WhyUs";
import { Services } from "@/components/Services";
import { CaseStudy } from "@/components/CaseStudy";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Payment } from "@/components/Payment";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
export default function Home() {
  return (
    <AgencyProvider>
      <main id="contenuto">
        <Hero />
        <SelectedWork />
        <WhyUs />
        <Services />
        <CaseStudy />
        <Process />
        <Pricing />
        <Payment />
        <FAQ />
        <FinalCTA />
      </main>
      <MotionDirector />
    </AgencyProvider>
  );
}
