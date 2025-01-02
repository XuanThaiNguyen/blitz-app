import React from 'react';

import {Block} from '../../../components/Block/Block';
import {Typo} from '../../../components/Typo/Typo';

interface TimerCountDownDisplayProps {
  timerDate: Date;
}

const TimerCountDownDisplay = ({timerDate}: TimerCountDownDisplayProps) => {
  return (
    <Block>
      <Typo text={`${timerDate.getMinutes().toString().padStart(2, '0')}:${timerDate.getSeconds().toString().padStart(2, '0')}`} color="red" />
    </Block>
  );
};

export default TimerCountDownDisplay;
