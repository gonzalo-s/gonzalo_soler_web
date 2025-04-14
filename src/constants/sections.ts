import { ButtonHref, ButtonIcon, ButtonProps, ButtonVariant } from '@/components/Button/Button';
import { ICONS } from './icons';
import { FooterProps } from '@/components/Footer/Footer';
import { IntroductionSection } from '@/components/RenderSection/Introduction/Introduction';
import { Project, ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import { AboutMeSection } from '@/components/RenderSection/AboutMe';
import { TechnologiesSection } from '@/components/RenderSection/Technologies';
import { ExperienceSection } from '@/components/RenderSection/Experience';

export type SectionType =
  | 'Introduction'
  | 'Projects'
  | 'AboutMe'
  | 'Contact'
  | 'Social'
  | 'Technologies'
  | 'Experience';

export type Section = {
  title: string;
  type: SectionType;
  href?: ButtonHref;
  buttonVariant?: ButtonVariant;
  isNav?: boolean;
  isFooter?: boolean;
  icon?: ButtonIcon;
  isMain?: boolean;
};

export type Sections = Array<
  IntroductionSection | ProjectsSection | AboutMeSection | TechnologiesSection | ExperienceSection | Section
>;

const highlightWords = [
  'BSN Sports',
  'CAA Quebec',
  'US Games',
  'Composable Commerce',
  'Next.js',
  'React',
  'Typescript',
  'Algolia',
  'Contentstack',
  'SASS',
  'HTML5',
  'Jest',
  'Bloomreach',
  'Commercetools',
  'Scrum',
  'CI/CD',
  'SaaS',
  'Zod',
  'Zustand',
  'Git',
  'GitHub',
  'GitLab',
  'Figma',
  'Jira',
  'Confluence',
  'Google Tag Manager',
  'Google Analytics',
  'Headless CMS',
  'Headless Commerce',
  'CMS',
  'cool',
  'a11y',
  'UX',
  'UI',
  'best practices',
  'accessibility',
  'user experience',
  'user interface',
  'CAA-Québec',
  'ReactJS',
  'validation',
  'in-depth ',
  'composable',
  'commerce',
  'architecture',
];

const projects: Array<Project> = [
  {
    title: 'BSN SPORTS',
    slug: 'bsn-sports',
    description:
      "BSN Sports, a major marketer, manufacturer, and distributor of sporting goods headquartered in Dallas, Texas, primarily serves institutional and team sports customers across the United States. Its purpose is to provide a comprehensive, one-stop shopping experience for athletic programs, offering a wide range of products and services. \n \n I was part of the team that developed BSN Sports' new website, a fully responsive and accessible platform built with Next.js and React, using TypeScript. This solution prioritized performance and SEO, integrating CommerceTools, Contentstack, and Algolia to deliver a fast and reliable search experience. The website also incorporated Google Analytics and Google Tag Manager for user interaction tracking and data analysis. Every component and solution within this platform was developed to meet stringent a11y standards and adhere to styling from Figma designs. \n \n Unified diverse data sources into a cohesive experience, using Next.js and modern state management tools. Utilized TypeScript and ReactJS within a CI/CD pipeline. Collaborated effectively with QA teams using Scrum methodology. Maintained clear communication in English with team members and stakeholders. Possess practical experience with SaaS solutions including Commercetools, Bloomreach, Contentstack, and Algolia. Mentored junior developers on the team.",
    shortDescription: 'B2B - B2C - COMPOSABLE COMMERCE ARCHITECTURE',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
      { stackIconName: 'commercetools', displayName: 'Commercetools', size: 'small' },
      { stackIconName: 'contentstack', displayName: 'Contentstack', size: 'small' },
      { stackIconName: 'algolia', displayName: 'Algolia', size: 'small' },
    ],
    image: {
      src: 'https://i.postimg.cc/QCCvxRPJ/bsn-sports.png',
      alt: 'Screenshot of the BSN Sports website homepage',
    },
    cta: {
      text: 'View Project 1',
      href: { internal: '/projects/bsn-sports' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
    goalsDetail:
      'Ensured universal accessibility (a11y) and pixel-perfect implementation of Figma designs for all components.\n\nDeveloped a highly detailed and accessible navigation system for both mobile and desktop platforms.\n\nArchitected product cards with content sourced from multiple locations (CMS, Algolia) and implemented robust caching mechanisms to minimize API calls and improve user experience.\n\nManaged the complexities of CMS data, including branch merging and the creation of structured content models and entries.',
    goalsList: [
      '✔️ Develop responsive mobile & desktop navigation with a strong emphasis on accessibility (a11y), UX, and UI best practices.',
      '✔️ Develop product card components ( a11y, UX, UI best practices).',
      '✔️ Streamlined data handling from several services, powering the Next.js app with efficient state and logic management.',
      '✔️ Collaborate closely with QA teams using Scrum methodology.',
      '✔️ Communicate daily in English with team members.',
      '✔️ Work with SaaS solutions: Commercetools, Bloomreach, Contentstack, Algolia.',
      '✔️ Leverage design tokens synced with Figma to ensure consistent styling, scalability',
    ],
    exampleLinks: [
      {
        text: 'Athletic Connection',
        href: { external: 'https://www.athleticconnection.com/' },
        variant: 'primary',
      },
      {
        text: 'BSN Sports',
        href: { external: 'https://www.bsnsports.com/' },
        variant: 'primary',
      },
    ],
    highlightWords: highlightWords,
  },
  {
    title: 'CAA QUEBEC',
    slug: 'caa-quebec',
    description:
      "CAA-Québec is a not-for-profit organization serving members within Quebec. Originating from merged automobile clubs with roots in the early 1900s and formally unified in 1984, the Quebec City-based company offers a broad range of services including roadside assistance, insurance, travel planning, and automotive services. Their focus is on providing reliable support and benefits to members across Quebec.  \n \n I was part of the team that developed CAA-Québec's new website, a fully responsive and accessible platform built with Next.js and React, using TypeScript. This solution prioritized performance and SEO, integrating a headless CMS (Contentstack) and Algolia to deliver a fast and reliable search experience. Every component and solution within this platform was developed to meet stringent a11y standards and adhere to styling from Figma designs. The website also incorporated Google Analytics and Google Tag Manager for user interaction tracking and data analysis.  \n \n Primarily focused on the comprehensive management of Contentstack within a Next.js environment, utilizing a range of relevant technologies and state management approaches. Proficient in the application of TypeScript and ReactJS. Collaborated closely with quality assurance teams, adhering to Scrum principles for effective collaboration. Communicated regularly and clearly in English with colleagues and stakeholders. Also gained practical experience with SaaS platforms such as Bloomreach and Algolia. Actively participated in the iterative development cycle by presenting feature increments for client review and input.",
    shortDescription: 'B2C - COMPOSABLE COMMERCE ARCHITECTURE',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
      { stackIconName: 'contentstack', displayName: 'Contentstack', size: 'small' },
      { stackIconName: 'algolia', displayName: 'Algolia', size: 'small' },
    ],
    image: {
      src: 'https://i.postimg.cc/tJcw1BGQ/caa-quebec.png',
      alt: 'Screenshot of the CAA Quebec website homepage',
    },
    cta: {
      text: 'View Project 2',
      href: { internal: '/projects/caa-quebec' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
    goalsDetail:
      'Foundation & Standards: Established and maintained a project-wide commitment to a11y standards and Figma styling for all components.\n\nIntricate Checkout Systems: Developed five distinct checkout flows, each with unique business logic, step-by-step implementation, specific styling, and dedicated state management using Zustand slices. Implemented server-side cookie tracking for user flow and step progression, enabling dynamic redirection and data persistence.\n\nDynamic Content & Navigation: Engineered a detailed and accessible site navigation for mobile and desktop. Developed product cards and a "card tiles grid component" that leveraged advanced CMS querying for complex data retrieval. Created a flexible "comparator component" with sophisticated querying to fulfill specific client requirements.\n\nUser Flow & Data Management: Managed user redirections based on various user characteristics and flow status, ensuring data integrity by clearing form data upon completion or abandonment. Managed CMS data, including content model creation.\n\nForm Standardization: Developed and enforced consistent patterns for form management, validation (using Zod), and error handling throughout the project, adhering to a11y guidelines and utilizing form actions.\n\nClient Handoff: Conducted comprehensive knowledge transfer to the client at the project\'s conclusion.',
    goalsList: [
      '✔️ Develop responsive mobile & desktop navigation',
      '✔️ Develop form accessibility and validation',
      '✔️ Designed and implemented systems to handle diverse service data efficiently, ensuring stability and performance in a Next.js application.',
      '✔️ Collaborate closely with QA teams using Scrum methodology.',
      '✔️ Communicate regularly in English with team members and stakeholders.',
      '✔️ Develop in-depth and complex queries in Contentstack',
      '✔️ Present sprint features to clients for feedback.',
      '✔️ Effectively manage the integration and execution of API calls on both the server and client sides of the application.',
      '✔️ Leverage design tokens synced with Figma to ensure consistent styling, scalability',
    ],
    exampleLinks: [
      {
        text: 'CAA Quebec',
        href: { external: 'https://www.caaquebec.com/fr' },
        variant: 'primary',
      },
    ],
    highlightWords: highlightWords,
  },
  {
    title: 'US GAMES',
    slug: 'us-games',
    description:
      "US Games is a line of physical education and recreational sports equipment distributed by major sporting goods providers, notably BSN Sports. Its purpose is to supply schools, recreational facilities, and individuals with a broad range of equipment designed to facilitate and encourage participation in physical activities and sports.  \n \n I was part of the team that developed US Games' new website, a fully responsive and accessible platform built with Next.js and React, using TypeScript. This solution prioritized performance and SEO, integrating CommerceTools, Contentstack, and Algolia to deliver a fast and reliable search experience. Every component and solution within this platform was developed to meet stringent a11y standards and adhere to styling from Figma designs. The website also incorporated Google Analytics and Google Tag Manager for user interaction tracking and data analysis.  \n \n Brought structure to sprawling datasets from multiple sources, wiring them seamlessly into a dynamic Next.js app. Utilized TypeScript and ReactJS within a CI/CD pipeline. Collaborated effectively with QA teams using Scrum methodology. Maintained clear communication in English with team members and stakeholders. Possess practical experience with SaaS solutions including Commercetools, Bloomreach, Contentstack, and Algolia. Mentored junior developers on the team",
    shortDescription: 'B2B - B2C - COMPOSABLE COMMERCE ARCHITECTURE',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
      { stackIconName: 'commercetools', displayName: 'Commercetools', size: 'small' },
      { stackIconName: 'contentstack', displayName: 'Contentstack', size: 'small' },
      { stackIconName: 'algolia', displayName: 'Algolia', size: 'small' },
    ],
    image: {
      src: 'https://i.postimg.cc/ryZvYw0n/us-games.png',
      alt: 'Project 3',
    },
    cta: {
      text: 'View Project 3',
      href: { internal: '/projects/us-games' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
    goalsDetail:
      'Ensured universal accessibility (a11y) and pixel-perfect implementation of Figma designs for all components.\n\nDeveloped a highly detailed and accessible navigation system for both mobile and desktop platforms.\n\nArchitected product cards with content sourced from multiple locations (CMS, Algolia) and implemented robust caching mechanisms to minimize API calls and improve user experience.\n\nManaged the complexities of CMS data, including branch merging and the creation of structured content models and entries.',
    goalsList: [
      '✔️ Develop responsive mobile & desktop navigation with a strong emphasis on accessibility (a11y), UX, and UI best practices.',
      '✔️ Develop product card components ( a11y, UX, UI best practices).',
      '✔️ Manage extensive datasets from various services within a Next.js application using a diverse array of technologies and state management.',
      '✔️ Collaborate closely with QA teams using Scrum methodology.',
      '✔️ Communicate daily in English with team members.',
      '✔️ Work with SaaS solutions: Commercetools, Bloomreach, Contentstack, Algolia.',
      '✔️ Leverage design tokens synced with Figma to ensure consistent styling, scalability',
    ],
    exampleLinks: [
      {
        text: 'Athletic Connection',
        href: { external: 'https://www.athleticconnection.com/' },
        variant: 'primary',
      },
      {
        text: 'US Games',
        href: { external: 'https://www.usgames.com/' },
        variant: 'primary',
      },
    ],
    highlightWords: highlightWords,
  },
];

const TECHNOLOGIES = Array.from(
  new Map(projects.flatMap((project) => project.stack).map((tech) => [tech.displayName, tech])).values(),
);

const EXPERIENCE: ExperienceSection['experience'] = [
  {
    company: 'Valtech_',
    position: 'Front-End Developer',
    duration: 'Apr 2022 - Present',
    description: `Various Composable Commerce Projects, Clients Based in the United States and Canada. \n
    Implemented scalable solutions for handling complex data interactions across services using Next.js and modern state management. Experienced in utilizing TypeScript and ReactJS within a CI/CD pipeline.\n \n Collaborated effectively with QA teams through the application of Scrum methodology. Maintained clear and consistent communication in English with both team members and stakeholders. Possesses practical experience working with SaaS solutions including commercetools, Bloomreach, Contentstack, and Algolia.\n \n Contributed to team growth by mentoring junior developers. Actively engaged in the development process by presenting sprint features to clients to gather valuable feedback. Further enhanced professional skills through participation in the Composable Commerce Academy (October 2022 - February 2023).
`,
  },
  {
    company: 'Freelance',
    position: 'Front-End Developer',
    duration: 'Oct 2019 - Apr 2020',
    description: `Dedicated to crafting responsive websites through the application of JavaScript, HTML, React.js, Styled-Components, and Next.js, with a strong focus on expanding my understanding of diverse frontend development aspects. \n \n Gained valuable experience collaborating with various independent clients, primarily within the commerce and service sectors, to deliver tailored web solutions.`,
  },
  {
    company: 'LGC Recording Studio',
    position: 'Studio Manager',
    duration: 'Oct 2012 - Apr 2019',
    description: `Directed recording studio projects, proactively shifting between roles (recorder, mixer, producer) to align with the specific needs of bands, independent musicians, and producers. Also formally taught audio recording and mixing to students. \n \n  This combination of direct professional interaction and educational instruction fostered crucial soft skills such as active listening (to understand client and student needs), problem-solving (in diverse creative and technical scenarios), and effective communication and presentation (both in project discussions and in various studio environments).`,
  },
];

export const SECTIONS: Sections = [
  {
    href: { internal: '#introduction' },
    title: 'Introduction',
    isMain: true,
    type: 'Introduction',
    buttonVariant: 'primary',
    image: {
      alt: 'Lego 3D figure working with a laptop, he kind of looks like me',
      src: 'https://i.postimg.cc/qRqcRJmZ/3dlego01-jpg-removebg-preview.png',
    },
    description: {
      highlightText: 'Frontend Developer',
      text: 'Clean Code. Sharp UX. User-First. Always!',
    },
    cta: {
      text: 'Check my LinkedIn',
      href: {
        external: 'https://www.linkedin.com/in/gonzalo-soler/',
      },
      variant: 'accent',
      icon: { icon: ICONS.arrowAltRight, pre: false },
    },
  },
  {
    href: { internal: '#projects' },
    title: 'Projects',
    isNav: true,
    isFooter: true,
    isMain: true,
    type: 'Projects',
    buttonVariant: 'primary',
    description: 'Some of my coolest projects!',
    projects: projects,
  },

  {
    href: { internal: '#about-me' },
    title: 'About me',
    isNav: true,
    isFooter: true,
    isMain: true,
    type: 'AboutMe',
    buttonVariant: 'primary',
    header: {
      highlightText: 'About Me',
      text: 'Frontend Developer',
    },
    description: {
      highlightText:
        'COMPOSABLE COMMERCE ARCHITECTURE with React and TypeScript is my jam😎. I turn vague ideas into intuitive, scalable web experiences that balance performance, usability, and adaptability.',
      text: 'I thrive in fast-paced teams where I can take ownership, collaborate closely with product and design, and move with autonomy. Always learning, always iterating—I’m passionate about building thoughtful, future-ready solutions that work beautifully across browsers and devices.',
      // highlightText:
      //   'With hands-on experience in composable commerce architecture and a strong foundation in React, Typescript and modern JavaScript libraries. Proficient in creating dynamic, user-focused web applications while adapting to diverse business requirements.',
      // text: 'Eager to leverage my expertise in responsive design, cross-browser compatibility, and performance optimization to drive innovative solutions in a forward-thinking team. Committed to continuous learning and applying best practices in software development to contribute significantly to the success of visionary tech initiatives.',
    },
  },
  {
    type: 'Technologies',
    title: 'Technologies',
    isMain: true,
    stack: TECHNOLOGIES,
  },
  {
    type: 'Experience',
    title: 'Experience',
    isMain: true,
    experience: EXPERIENCE,
  },
  {
    href: { internal: '#contact' },
    title: 'Contact',
    isNav: true,
    isMain: true,
    type: 'Contact',
    icon: { pre: false, icon: ICONS.arrowAltRight },
    buttonVariant: 'primary',
  },
  {
    href: { external: 'https://www.linkedin.com/in/gonzalo-soler/' },
    title: 'Linkedin',
    isFooter: true,
    icon: { pre: true, icon: ICONS.linkedin },
    type: 'Social',
    buttonVariant: 'primary',
  },
];

export const LOGO: ButtonProps = {
  text: 'Gonzalo Soler',
  variant: 'primary',
  href: { internal: '/' },
  icon: { pre: true, icon: ICONS.logo },
};

export const FOOTER_DETAILS: FooterProps['details'] = {
  logo: LOGO,
  description: "I'm a Frontend Developer focused on details and user experience.",
  email: ['gonzalosoler', 'gmail.com'],
};
