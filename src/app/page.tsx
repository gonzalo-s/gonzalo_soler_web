import { SECTIONS } from '@/constants/sections';
import RenderSection from '@/components/RenderSection/RenderSection';
import { loadAllSections } from '@/lib/services/fetchGoogleSheetData';

export default async function Home() {
  const mainSections = SECTIONS.filter((section) => section.isMain);

  const googleSheetData = await loadAllSections();
  console.log('🚀 ~ Home ~ googleSheetData:', googleSheetData);

  return (
    <>
      {mainSections.map((section) => {
        return <RenderSection {...section} key={section.title} />;
      })}
    </>
  );
}
