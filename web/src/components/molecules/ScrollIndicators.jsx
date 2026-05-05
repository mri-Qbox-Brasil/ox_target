import ScrollIndicator from '../atoms/ScrollIndicator';

export default function ScrollIndicators({ canScrollUp, canScrollDown, closing, scrollIndex, optionsLength, maxVisible, color, onScrollUp, onScrollDown }) {
  return (
    <>
      <ScrollIndicator
        direction="up"
        visible={canScrollUp}
        closing={closing}
        count={scrollIndex}
        color={color}
        onClick={onScrollUp}
      />
      <ScrollIndicator
        direction="down"
        visible={canScrollDown}
        closing={closing}
        count={optionsLength - scrollIndex - maxVisible}
        color={color}
        onClick={onScrollDown}
      />
    </>
  );
}
