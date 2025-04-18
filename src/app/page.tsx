import { SECTIONS } from '@/constants/sections';
import RenderSection from '@/components/RenderSection/RenderSection';

export default function Home() {
  const mainSections = SECTIONS.filter((section) => section.isMain);

  return (
    <>
      {mainSections.map((section) => {
        return <RenderSection {...section} key={section.title} />;
      })}
    </>
  );
}
