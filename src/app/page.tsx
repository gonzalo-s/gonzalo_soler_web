import RenderSection from '@/components/RenderSection/RenderSection';
import { loadAllSections } from '@/lib/services/loadAllSections';

export default async function Home() {
  console.log('🚀 ~ Home ~ Home -1-');

  const googleSheetData = await loadAllSections();
  console.log('🚀 ~ Home ~ Home -2- googleSheetData');

  const mainSectionsFromGoogleSheet = googleSheetData.filter((section) => section.isMain);
  console.log('🚀 ~ Home ~ Home -3-');

  return (
    <>
      {mainSectionsFromGoogleSheet.map((section) => {
        return <RenderSection {...section} key={section.title} />;
      })}
    </>
  );
}
