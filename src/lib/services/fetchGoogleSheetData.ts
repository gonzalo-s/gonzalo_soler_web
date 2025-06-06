import Papa from 'papaparse';

// --------------------------------------
// CSV SOURCES
// --------------------------------------

const CSV_URLS = {
  SectionType:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=2040098829&single=true&output=csv',
  IntroductionSection:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=809314090&single=true&output=csv',
  ProjectsSection:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=1857132769&single=true&output=csv',
  Project:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=1039347494&single=true&output=csv',
  ProjectStack:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=1803021125&single=true&output=csv',
  ProjectGoals:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=2026576585&single=true&output=csv',
  ProjectExampleLinks:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=46684487&single=true&output=csv',
  AboutMeSection:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=398161655&single=true&output=csv',
  TechnologiesSection:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=2052195513&single=true&output=csv',
  StackIconProps:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=1406571729&single=true&output=csv',
  ExperienceSection:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=210936598&single=true&output=csv',
  ExperienceItems:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=1408658043&single=true&output=csv',
  ContactSection:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=1860395231&single=true&output=csv',
  HighlightWords:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQVXR-M3L9DKCC1GGmtOEE7VV0Gppw4ILTlI74CIQoq3SLCgYyL1f3dw_kHJLALGQGGDeVJR8NDtAA/pub?gid=1616027444&single=true&output=csv',
};

// CSV loader helper
async function fetchCsv<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const text = await response.text();
  const { data } = Papa.parse<T>(text, { header: true, skipEmptyLines: true });
  return data;
}

// --------------------------------------
// PARSER SCAFFOLD FUNCTIONS
// --------------------------------------

async function parseIntroductionSection() {
  const raw = await fetchCsv<any>(CSV_URLS.IntroductionSection);
  console.log('IntroductionSection:', raw);
  return raw;
}

async function parseProjectsSection() {
  const projectsSectionRaw = await fetchCsv<any>(CSV_URLS.ProjectsSection);
  const projectsRaw = await fetchCsv<any>(CSV_URLS.Project);
  const projectGoalsRaw = await fetchCsv<any>(CSV_URLS.ProjectGoals);
  const projectStackRaw = await fetchCsv<any>(CSV_URLS.ProjectStack);
  const projectLinksRaw = await fetchCsv<any>(CSV_URLS.ProjectExampleLinks);

  console.log('ProjectsSection:', projectsSectionRaw);
  console.log('Projects:', projectsRaw);
  console.log('ProjectGoals:', projectGoalsRaw);
  console.log('ProjectStack:', projectStackRaw);
  console.log('ProjectExampleLinks:', projectLinksRaw);

  return {
    projectsSectionRaw,
    projectsRaw,
    projectGoalsRaw,
    projectStackRaw,
    projectLinksRaw,
  };
}

async function parseAboutMeSection() {
  const raw = await fetchCsv<any>(CSV_URLS.AboutMeSection);
  console.log('AboutMeSection:', raw);
  return raw;
}

async function parseTechnologiesSection() {
  const techSectionRaw = await fetchCsv<any>(CSV_URLS.TechnologiesSection);
  const stackIconsRaw = await fetchCsv<any>(CSV_URLS.StackIconProps);
  console.log('TechnologiesSection:', techSectionRaw);
  console.log('StackIconProps:', stackIconsRaw);
  return { techSectionRaw, stackIconsRaw };
}

async function parseExperienceSection() {
  const expSectionRaw = await fetchCsv<any>(CSV_URLS.ExperienceSection);
  const expItemsRaw = await fetchCsv<any>(CSV_URLS.ExperienceItems);
  console.log('ExperienceSection:', expSectionRaw);
  console.log('ExperienceItems:', expItemsRaw);
  return { expSectionRaw, expItemsRaw };
}

async function parseContactSection() {
  const raw = await fetchCsv<any>(CSV_URLS.ContactSection);
  console.log('ContactSection:', raw);
  return raw;
}

async function parseHighlightWords() {
  const raw = await fetchCsv<any>(CSV_URLS.HighlightWords);
  console.log('HighlightWords:', raw);
  return raw;
}

// --------------------------------------
// MAIN ENTRYPOINT
// --------------------------------------

export async function loadAllSections() {
  const [intro, projects, aboutMe, tech, experience, contact, highlightWords] = await Promise.all([
    parseIntroductionSection(),
    parseProjectsSection(),
    parseAboutMeSection(),
    parseTechnologiesSection(),
    parseExperienceSection(),
    parseContactSection(),
    parseHighlightWords(),
  ]);

  console.log('✅ All sections loaded (scaffold)');

  // We will progressively implement each parsing function from here
}
