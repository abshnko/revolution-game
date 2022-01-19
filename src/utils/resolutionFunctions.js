export const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
};

export const heightIsOverNpx = ({ clientHeight }, number) => {
  return clientHeight >= number;
};
