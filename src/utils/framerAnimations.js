import { cubicBezier } from 'framer-motion';

// basic animation - from bottom
export const containerAnimationFromBottom = {
  hidden: {
    y: '100px',
  },
  visible: {
    y: '0px',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// basic animation - from top
export const containerAnimationFromTop = {
  hidden: {
    y: '-100px',
  },
  visible: {
    y: '0px',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// sidebar animation
// container
export const sidebarContainerAnimation = {
  //
  hidden: {},
  //
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  //
};

// children
export const sidebarChildrenAnimation = {
  visible: { opacity: 1, x: 0, transition: { ease: 'backInOut' } },
  hidden: { opacity: 0, x: -100 },
};

// movie list animation
const customEase = cubicBezier(0.35, 0.17, 0.3, 0.86);
// list
export const moviesContainerAnimation = {
  //
  hidden: {},
  //
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  //
};

// children
export const moviesChildrenAnimation = {
  visible: { opacity: 1, y: 0, transition: { ease: customEase } },
  hidden: { opacity: 0, y: 100 },
};
