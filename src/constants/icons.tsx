import { FaLinkedin, FaGithub, FaArrowRight, FaCode, FaHandSpock, FaCaretRight } from 'react-icons/fa';
import CloseIcon from './CloseIcon/CloseIcon';
import OpenIcon from './OpenIcon/OpenIcon';

export const ICONS = {
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  arrowAltRight: <FaArrowRight style={{ transform: 'rotate(-45deg)' }} />,
  logo: <FaCode size="20px" />,
  menuOpen: <OpenIcon />,
  menuClose: <CloseIcon />,
  handSpock: <FaHandSpock />,
  caretRight: <FaCaretRight />,
};
