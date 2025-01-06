import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';

interface ProjectItemProps {
  item: ProjectProps;
  index: number;
}

const ProjectItem = ({item, index}: ProjectItemProps) => {
  const {theme} = useTheme();

  const onProjectDetail = () => {
    navigationRef.current?.navigate(Screen.ProjectDetail, {projectId: item._id});
  };

  return (
    <Button key={item._id} onPress={onProjectDetail}>
      <Block
        mRight={(index + 1) % 2 === 0 ? 0 : 12}
        paddingVertical={16}
        paddingHorizontal={SpacingDefault.smaller}
        w={(SpacingDefault.width / 2) - SpacingDefault.medium - SpacingDefault.radius}
        mBottom={8}
        borderRadius={6}
        borderWidth={1}
        borderColor={item.projectInfo.color}
        bgColor={theme.backgroundBox}
      >
        <Block row alignCenter>
          <FastImage tintColor={item.projectInfo.color} source={images.ic_project} style={styles.image} />
          <Spacer width={'smaller'} />
          <Typo preset="r16" color={theme.primaryText} numberOfLines={2} text={`${item.projectInfo.title}`} />
        </Block>
        <Spacer height={16} />
        <Typo
          preset="b16"
          color={theme.primaryText}
          text={'9h 35m (7)'}
        />
      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});

export default ProjectItem;
