import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import colors from '../../../themes/Colors';
import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';

const FOCUS_TIME_MINUTE = 0.1 * 60 * 1000;
const BREAK_TIME_MINUTE = 0.05 * 60 * 1000;
const TIMES = 2;

const Pomodoro = () => {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTE);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [times, setTimes] = useState<number>(0);

  useEffect(() => {
    if (times === TIMES) {
      onStopTimer();
      alertBottomModal({
        title: 'Success',
        message: 'You finished the timer!',
        status: 'success',
        dismissable: true,
      });
      return;
    }

    if (timerCount === 0) {
      if (timerMode === 'focus') {
        setTimerMode('break');
        setTimerCount(BREAK_TIME_MINUTE);
      } else {
        setTimerMode('focus');
        setTimerCount(FOCUS_TIME_MINUTE);
        setTimes(prev => prev + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerCount]);

  const onStartTimer = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000);
    setTimerInterval(id);
  };

  const onStopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
    setIsTimerRunning(false);
  };

  const renderCountdown = useCallback(() => {
    const _duration = (timerMode === 'focus' ? FOCUS_TIME_MINUTE : BREAK_TIME_MINUTE) / 1000;
    const timerDate = new Date(timerCount);

    return (
      <CountdownCircleTimer
        isPlaying={isTimerRunning}
        duration={_duration}
        colors={timerMode === 'focus' ? ['#FF6347', '#FF6347'] : ['#607D8A', '#607D8A']}
        colorsTime={[_duration, 0]}
        onComplete={() => {
          return {shouldRepeat: true};
        }}
      >
        {() => (
          <Block center>
            <Typo>Mode: <Typo text={timerMode} color={timerMode === 'focus' ? 'red' : colors.priorityLow} /></Typo>
            <Typo text={`${timerDate.getMinutes().toString().padStart(2, '0')}:${timerDate.getSeconds().toString().padStart(2, '0')}`} color={timerMode === 'focus' ? 'red' : colors.priorityLow} />
            <Typo text={`Times: ${times}/${TIMES}`} color="red" />
          </Block>
        )}
      </CountdownCircleTimer>
    );
  }, [isTimerRunning, timerMode, timerCount, times]);

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Spacer height={32} />
      {/* <TimerCountDownDisplay timerDate={new Date(timerCount)} /> */}
      {renderCountdown()}
      <Spacer height={12} />
      <Button text={isTimerRunning ? 'Stop Timer' : 'Start timer'} onPress={isTimerRunning ? onStopTimer : onStartTimer} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default Pomodoro;
