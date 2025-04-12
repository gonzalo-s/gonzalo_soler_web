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

const projects: Array<Project> = [
  {
    title: 'BSN SPORTS',
    slug: 'bsn-sports',
    description:
      'BSN Sports is a major marketer, manufacturer, and distributor of sporting goods, including apparel, footwear, equipment, and team uniforms. Headquartered in Dallas, Texas, the company primarily serves institutional and team sports customers across the United States, such as colleges, universities, middle and high schools, and recreational programs. Its main purpose is to provide a comprehensive, one-stop shopping experience for athletic programs, offering a wide range of products and services to support their needs. \n \n  I was part of the team that developed the new website for BSN Sports. The project was built using Next.js and React, with TypeScript as the main language. The website was designed to be fully responsive and accessible, with a focus on performance and SEO. The project was developed using CommerceTools, Contentstack, and a search engine, Algolia, to provide a fast and reliable search experience for users. The website was also integrated with Google Analytics and Google Tag Manager to track user interactions and gather data.  \n \n  Demonstrated proficiency in managing extensive datasets from diverse services within a Next.js application, leveraging a variety of technologies and state management solutions. Experienced in utilizing TypeScript and ReactJS within a CI/CD pipeline. Collaborated effectively with QA teams through the application of Scrum methodology. Maintained clear and consistent communication in English with both team members and stakeholders. Possesses practical experience working with SaaS solutions including commercetools, Bloomreach, Contentstack, and Algolia. Contributed to team growth by mentoring junior developers.',
    shortDescription: 'B2B - B2C - Composable commerce',
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
      alt: 'Project 1',
    },
    cta: {
      text: 'View Project 1',
      href: { internal: '/projects/bsn-sports' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
    goalsList: [
      '✔️ In charge of developing responsive mobile & desktop navigation with a strong emphasis on accessibility (a11y), UX, and UI best practices.',
      '✔️ Developed product card components ( a11y, UX, UI best practices).',
      '✔️ Managed extensive datasets from various services within a Next.js application using a diverse array of technologies and state management.',
      '✔️ Collaborated closely with QA teams using Scrum methodology.',
      '✔️ Communicated daily in English with team members.',
      '✔️ Worked with SaaS solutions: commercetools, Bloomreach, Contentstack, Algolia.',
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
  },
  {
    title: 'CAA QUEBEC',
    slug: 'caa-quebec',
    description:
      'CAA-Québec is a not-for-profit organization that serves members within the Canadian province of Quebec. Originating from the merging of earlier automobile clubs, its history traces back to the early 1900s, with formal unification occurring in 1984. Headquartered in Quebec City, the company delivers a broad spectrum of services, including roadside assistance, insurance, travel planning, and automotive services. Their focus is on providing reliable support and benefits to their members throughout Quebec. \n \n I was part of the team that developed the new website for CAA-Québec. The project was built using Next.js and React, with TypeScript as the main language. The website was designed to be fully responsive and accessible, with a focus on performance and SEO. The project was developed using a headless CMS, Contentstack, and a search engine, Algolia, to provide a fast and reliable search experience for users. The website was also integrated with Google Analytics and Google Tag Manager to track user interactions and gather data. \n \n  Primarily focused on the comprehensive management of Contentstack within a Next.js environment, utilizing a range of relevant technologies and state management approaches. Proficient in the application of TypeScript and ReactJS. Worked closely with quality assurance teams, adhering to Scrum principles for effective collaboration. Communicated regularly and clearly in English with both colleagues and relevant stakeholders. Also gained practical experience with SaaS platforms such as Bloomreach and Algolia. Actively participated in the iterative development cycle by presenting feature increments to clients for their review and input.',
    shortDescription: 'B2C - Composable commerce',
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
      alt: 'Project 2',
    },
    cta: {
      text: 'View Project 2',
      href: { internal: '/projects/caa-quebec' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
    goalsList: [
      '✔️ In charge of developing responsive mobile & desktop navigation',
      '✔️ In charge of form accessibility and validation',
      '✔️ Managed extensive datasets from various services within a Next.js application using a diverse array of technologies and state management.',
      '✔️ Collaborated closely with QA teams using Scrum methodology.',
      '✔️ Communicated regularly in English with team members and stakeholders.',
      '✔️ Experienced in designing and working with in-depth and complex queries in Contentstack',
      '✔️ Presented sprint features to clients for feedback.',
      '✔️ Effectively managed the integration and execution of API calls on both the server and client sides of the application.',
    ],
    exampleLinks: [
      {
        text: 'CAA Quebec',
        href: { external: 'https://www.caaquebec.com/fr' },
        variant: 'primary',
      },
    ],
  },
  {
    title: 'US GAMES',
    slug: 'us-games',
    description:
      'US Games (sports equipment) is a line of physical education and recreational sports equipment. 1  While not a standalone, headquartered company in the traditional sense, its products are distributed by major sporting goods providers, notably BSN Sports. Its main purpose is to supply schools, recreational facilities, and individuals with a broad range of equipment designed to facilitate and encourage participation in physical activities and sports. \n \n I was part of the team that developed the new website for US Games. The project was built using Next.js and React, with TypeScript as the main language. The website was designed to be fully responsive and accessible, with a focus on performance and SEO. The project was developed using CommerceTools, Contentstack, and a search engine, Algolia, to provide a fast and reliable search experience for users. The website was also integrated with Google Analytics and Google Tag Manager to track user interactions and gather data. \n \n  Demonstrated proficiency in managing extensive datasets from diverse services within a Next.js application, leveraging a variety of technologies and state management solutions. Experienced in utilizing TypeScript and ReactJS within a CI/CD pipeline. Collaborated effectively with QA teams through the application of Scrum methodology. Maintained clear and consistent communication in English with both team members and stakeholders. Possesses practical experience working with SaaS solutions including commercetools, Bloomreach, Contentstack, and Algolia. Contributed to team growth by mentoring junior developers.',
    shortDescription: 'B2B - B2C - Composable commerce',
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
    goalsList: [
      '✔️ In charge of developing responsive mobile & desktop navigation with a strong emphasis on accessibility (a11y), UX, and UI best practices.',
      '✔️ Developed product card components ( a11y, UX, UI best practices).',
      '✔️ Managed extensive datasets from various services within a Next.js application using a diverse array of technologies and state management.',
      '✔️ Collaborated closely with QA teams using Scrum methodology.',
      '✔️ Communicated daily in English with team members.',
      '✔️ Worked with SaaS solutions: commercetools, Bloomreach, Contentstack, Algolia.',
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
    Demonstrated proficiency in managing extensive datasets from diverse services within a Next.js application, leveraging a variety of technologies and state management solutions. Experienced in utilizing TypeScript and ReactJS within a CI/CD pipeline.\n \n Collaborated effectively with QA teams through the application of Scrum methodology. Maintained clear and consistent communication in English with both team members and stakeholders. Possesses practical experience working with SaaS solutions including commercetools, Bloomreach, Contentstack, and Algolia.\n \n Contributed to team growth by mentoring junior developers. Actively engaged in the development process by presenting sprint features to clients to gather valuable feedback. Further enhanced professional skills through participation in the Composable Commerce Academy (October 2022 - February 2023).
`,
  },
  {
    company: 'Freelance',
    position: 'Front-End Developer',
    duration: 'Oct 2019 - Apr 2020',
    description: `Dedicated to crafting responsive websites through the application of JavaScript, HTML, React.js, Styled-Components, and Next.js, with a strong focus on expanding my understanding of diverse frontend development aspects. \n \n Gained valuable experience collaborating with various independent clients, primarily within the commerce and service sectors, to deliver tailored web solutions.`,
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
      alt: '',
      src: 'https://i.postimg.cc/qRqcRJmZ/3dlego01-jpg-removebg-preview.png',
    },
    description: {
      highlightText: 'Highligh text',
      text: 'Some other text with some more data and blah',
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
        'With hands-on experience in composable commerce and a strong foundation in React and modern JavaScript libraries. Proficient in creating dynamic, user-focused web applications while adapting to diverse business requirements.',
      text: 'Eager to leverage my expertise in responsive design, cross-browser compatibility, and performance optimization to drive innovative solutions in a forward-thinking team. Committed to continuous learning and applying best practices in software development to contribute significantly to the success of visionary tech initiatives.',
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
  email: 'gonzalosoler@gmail.com',
};

// goalsList: [
//   '✔️ Managed extensive datasets from various services within a Next.js application using a diverse array of technologies and state management.',
//   '✔️ Utilized TypeScript and ReactJS in a CI/CD pipeline.',
//   '✔️ Collaborated closely with QA teams using Scrum methodology.',
//   '✔️ Communicated regularly in English with team members and stakeholders.',
//   '✔️ Worked with SaaS solutions: commercetools, Bloomreach, Contentstack, Algolia.',
//   '✔️ Mentored junior developers.',
//   '✔️ Presented sprint features to clients for feedback.',
//   '✔️ Participated in the Composable Commerce Academy (Oct 2022 - Feb 2023).',
// ],
// exampleLinks: [
//   {
//     text: 'Athletic Connection',
//     href: { external: 'https://www.athleticconnection.com/' },
//     variant: 'primary',
//   },
//   {
//     text: 'US Games',
//     href: { external: 'https://www.usgames.com/' },
//     variant: 'primary',
//   },
//   {
//     text: 'BSN Sports',
//     href: { external: 'https://www.bsnsports.com/' },
//     variant: 'primary',
//   },
//   {
//     text: 'CAA Quebec',
//     href: { external: 'https://www.caaquebec.com/fr' },
//     variant: 'primary',
//   },
// ],

// CAA descrioption:
// Primarily focused on the comprehensive management of Contentstack within a Next.js environment, utilizing a range of relevant technologies and state management approaches. Proficient in the application of TypeScript and ReactJS. Worked closely with quality assurance teams, adhering to Scrum principles for effective collaboration. Communicated regularly and clearly in English with both colleagues and relevant stakeholders. Also gained practical experience with SaaS platforms such as Bloomreach and Algolia. Actively participated in the iterative development cycle by presenting feature increments to clients for their review and input.

// bsn description:
// Demonstrated proficiency in managing extensive datasets from diverse services within a Next.js application, leveraging a variety of technologies and state management solutions. Experienced in utilizing TypeScript and ReactJS within a CI/CD pipeline. Collaborated effectively with QA teams through the application of Scrum methodology. Maintained clear and consistent communication in English with both team members and stakeholders. Possesses practical experience working with SaaS solutions including commercetools, Bloomreach, Contentstack, and Algolia. Contributed to team growth by mentoring junior developers. Further enhanced professional skills through participation in the Composable Commerce Academy (October 2022 - February 2023)
