import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import BodyPart from '../body-part/body_part';
import "react-horizontal-scrolling-menu/dist/styles.css";
import RightArrowIcon from '../../../assets/icons/right-arrow.png';
import LeftArrowIcon from '../../../assets/icons/left-arrow.png';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import usePreventBodyScroll from '../../../utils/usePreventBodyScroll';
import ExerciseCard from '../../exercise-card/exercise_card';
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const onWheel = (apiObj: scrollVisibilityApiType, ev: React.WheelEvent) => {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }
  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }: {
  data: Array<any>,
  bodyParts?: Array<string>,
  setBodyPart?: React.Dispatch<React.SetStateAction<string>>,
  bodyPart?: string,
}) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <div onMouseEnter={disableScroll} onMouseLeave={enableScroll} className='w-100'>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
      >
        {
          data.map((item) => {
            return <Box
              key={item.id || item}
              itemID={item.id || item}
              // id = {item.id || item}
              title={item}
              m="0 40px"
            >
              {bodyParts && setBodyPart && bodyPart ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} /> }
            </Box>
          })
        }
      </ScrollMenu>
    </div>
  )
}

export default HorizontalScrollbar