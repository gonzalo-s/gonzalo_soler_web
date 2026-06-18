import {
  FaLinkedin,
  FaGithub,
  FaArrowRight,
  FaCode,
  FaHandSpock,
  FaCaretRight,
  FaVideo,
  FaBriefcase,
  FaLayerGroup,
  FaBullseye,
  FaRegLightbulb,
  FaLink,
  FaPlay,
  FaPause,
  FaStop,
} from 'react-icons/fa';
import CloseIcon from './CloseIcon/CloseIcon';
import OpenIcon from './OpenIcon/OpenIcon';

export const ICONS = {
  linkedin: <FaLinkedin />,
  github: <FaGithub color="#000" />,
  arrowAltRight: <FaArrowRight style={{ transform: 'rotate(-45deg)' }} />,
  logo: <FaCode size="20px" />,
  menuOpen: <OpenIcon />,
  menuClose: <CloseIcon />,
  handSpock: <FaHandSpock />,
  caretRight: <FaCaretRight />,
  video: <FaVideo />,
  briefcase: <FaBriefcase />,
  stack: <FaLayerGroup />,
  target: <FaBullseye />,
  overview: <FaRegLightbulb />,
  link: <FaLink />,
  play: <FaPlay />,
  pause: <FaPause />,
  stop: <FaStop />,
};
