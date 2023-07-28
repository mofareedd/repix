import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface IProps {
  before: string;
  after: string;
}
function CompareSlider({ before, after }: IProps) {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={before} alt="Image one" />}
      itemTwo={<ReactCompareSliderImage src={after} alt="Image two" />}
      portrait
      className="flex w-[475px] rounded-md"
    />
  );
}

export default CompareSlider;
