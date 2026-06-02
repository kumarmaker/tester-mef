import Hero from "@/components/sections/Hero";
import PlanetaryVision from "@/components/sections/PlanetaryVision";
import WhatWeDo from "@/components/sections/WhatWeDo";
import ProjectsAccordion from "@/components/sections/ProjectsAccordion";
import RecentEvents from "@/components/sections/RecentEvents";
import OurPartners from "@/components/sections/OurPartners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlanetaryVision />
      <WhatWeDo />
      <ProjectsAccordion rounded title="Massive Earth Foundation Projects" titleVariant="large" />
      <RecentEvents />
      <OurPartners />
    </>
  );
}
