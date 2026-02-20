export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export const smoothTransition = {
  transition: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },
};

export const slowTransition = {
  transition: {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const listItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
};

export const cardHover = {
  rest: { 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  hover: { 
    y: -4, 
    scale: 1.01,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
};

export const buttonTap = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
};

export const numberCounter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const pulseGlow = {
  initial: { boxShadow: "0 0 20px rgba(103, 232, 249, 0.3)" },
  animate: { 
    boxShadow: ["0 0 20px rgba(103, 232, 249, 0.3)", "0 0 40px rgba(103, 232, 249, 0.5)", "0 0 20px rgba(103, 232, 249, 0.3)"]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const float = {
  initial: { y: 0 },
  animate: { 
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const modalIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  },
};

export const tooltipIn = {
  hidden: { opacity: 0, y: 4 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.15 }
  },
  exit: { 
    opacity: 0, 
    y: 4,
    transition: { duration: 0.1 }
  },
};

export const tabSwitch = {
  hidden: { opacity: 0, x: -8 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
  },
  exit: { 
    opacity: 0, 
    x: 8,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  },
};

export const skeletonLoading = {
  initial: { backgroundPosition: "-200% 0" },
  animate: { backgroundPosition: "200% 0" },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  },
};
