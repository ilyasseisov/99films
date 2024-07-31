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

// sidebar container
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

export const sidebarChildrenAnimation = {
  visible: { opacity: 1, x: 0, transition: { ease: 'backInOut' } },
  hidden: { opacity: 0, x: -100 },
};
