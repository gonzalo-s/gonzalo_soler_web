import RenderSection from '@/components/RenderSection/RenderSection';
import { loadAllSections } from '@/lib/services/loadAllSections';

export default async function Home() {
  const googleSheetData = await loadAllSections();

  const mainSectionsFromGoogleSheet = googleSheetData.filter((section) => section.isMain);

  return (
    <>
      {mainSectionsFromGoogleSheet.map((section) => {
        return <RenderSection {...section} key={section.title} />;
      })}
    </>
  );
}
