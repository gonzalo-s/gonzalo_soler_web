/** Validate required content settings when their source is used. */
function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}. Configure it before building.`);
  return value;
}

export const contentUrls = {
  get storytelling() {
    return required('STORYTELLING_CSV_URL');
  },
  get sectionType() {
    return required('SECTION_TYPE_CSV_URL');
  },
  get introductionSection() {
    return required('INTRODUCTION_SECTION_CSV_URL');
  },
  get projectsSection() {
    return required('PROJECTS_SECTION_CSV_URL');
  },
  get project() {
    return required('PROJECT_CSV_URL');
  },
  get projectStack() {
    return required('PROJECT_STACK_CSV_URL');
  },
  get projectGoals() {
    return required('PROJECT_GOALS_CSV_URL');
  },
  get projectExampleLinks() {
    return required('PROJECT_EXAMPLE_LINKS_CSV_URL');
  },
  get aboutMeSection() {
    return required('ABOUT_ME_SECTION_CSV_URL');
  },
  get technologiesSection() {
    return required('TECHNOLOGIES_SECTION_CSV_URL');
  },
  get stackIconProps() {
    return required('STACK_ICON_PROPS_CSV_URL');
  },
  get experienceSection() {
    return required('EXPERIENCE_SECTION_CSV_URL');
  },
  get experienceItems() {
    return required('EXPERIENCE_ITEMS_CSV_URL');
  },
  get contactSection() {
    return required('CONTACT_SECTION_CSV_URL');
  },
  get highlightWords() {
    return required('HIGHLIGHT_WORDS_CSV_URL');
  },
  get logo() {
    return required('LOGO_CSV_URL');
  },
  get footerDetail() {
    return required('FOOTER_DETAIL_CSV_URL');
  },
  get socialSection() {
    return required('SOCIAL_SECTION_CSV_URL');
  },
};
