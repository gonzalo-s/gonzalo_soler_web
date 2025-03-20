import { FaLinkedin, FaGithub, FaArrowRight, FaCode, FaHandSpock } from 'react-icons/fa';
import CloseIcon from './CloseIcon.tsx/CloseIcon';
import OpenIcon from './OpenIcon.tsx/OpenIcon';

export const ICONS = {
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  arrowAltRight: <FaArrowRight style={{ transform: 'rotate(-45deg)' }} />,
  logo: <FaCode size="20px" />,
  menuOpen: <OpenIcon />,
  menuClose: <CloseIcon />,
  handSpock: <FaHandSpock />,
};
