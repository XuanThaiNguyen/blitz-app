import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {TagProps} from '../../../model/Tag.props';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';

interface SelectTagModalProps {
  tags: TagProps[];
  onSelectTag: (tags: string[]) => void;
  isVisible: boolean;
  onCloseModal: () => void;
  projectId?: string;
  currentTags?: string[];
}

const EmptyTag = ({onCreateTag}: {onCreateTag: () => void}) => {
  const {isDark, theme} = useTheme();
  const styles = useStyles(theme);

  return (
    <Block center>
      <FastImage source={isDark ? images.empty_dark : images.empty_light} style={styles.iconEmpty} />
      <Spacer height={12} />
      <Typo text="You have no tags right now" preset="r16" color={theme.primaryText} center />
      <Spacer height={12} />
      <Button height={44} preset="primary" text="Create Now" onPress={onCreateTag} style={{paddingHorizontal: SpacingDefault.normal}} />
      <Spacer height={16} />
    </Block>
  );
};

const SelectTagModal = ({isVisible, onCloseModal, tags, onSelectTag, projectId, currentTags = []}: SelectTagModalProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const insets = useSafeAreaInsets();

  const [selectedTags, setSelectedTags] = useState<string[]>(currentTags);
  const tagsRef = useRef<string[]>([]);

  useEffect(() => {
    if (JSON.stringify(currentTags) !== JSON.stringify(selectedTags)) {
      setSelectedTags(currentTags);
      tagsRef.current = currentTags;
    }
  }, [currentTags])

  const onAddOrRemoveTag = (tagId: string) => () => {
    const existTagIndex = selectedTags.findIndex(ele => ele === tagId);
    if (existTagIndex !== -1) {
      const newTags = selectedTags.filter((ele: string) => ele !== tagId);
      setSelectedTags(newTags);
    } else {
      setSelectedTags(prev => [...prev, tagId]);
    }
  }

  const renderTagItem = (item: TagProps, index: number) => {
    return (
      <Button key={`${item.name}-${item.color}-${index}`} onPress={onAddOrRemoveTag(item._id)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
        <Block row alignCenter>
          <FastImage source={images.ic_tag} style={{width: 24, height: 24}} tintColor={item.color} />
          <Spacer width={'smaller'} />
          <Typo text={item.name} color={theme.primaryText} />
        </Block>
        {selectedTags.includes(item._id) ? (
          <FastImage source={images.ic_check} style={{width: 16, height: 16}} tintColor={theme.primaryText} />
        ) : <></>}
      </Button>
    )
  };

  const _onSelectTags = () => {
    onCloseModal();
    onSelectTag(selectedTags);
    tagsRef.current = selectedTags;
  }

  const _onCreateTag = () => {
    onCloseModal();
    navigationRef.current?.navigate(Screen.CreateTag, {projectId});
  };

  const _shouldDisabled = useMemo(() => JSON.stringify(tagsRef.current) === JSON.stringify(selectedTags), [selectedTags])

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SpacingDefault.height}
      deviceWidth={SpacingDefault.width}
      style={styles.modal}
      onBackdropPress={onCloseModal}
      avoidKeyboard={false}
      onModalHide={onCloseModal}
      backdropOpacity={0.4}
    >
      {!!isVisible ? (
        <Block style={styles.block}>
          <Spacer height={32} />
          <Button onPress={onCloseModal} style={styles.buttonClose}>
            <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
          </Button>
          <Spacer height={24} />
          <Typo text="Tags" preset="b20" color={theme.primaryText} />
          <Spacer height={32} />
          {tags?.length === 0 ? <EmptyTag onCreateTag={_onCreateTag} /> : tags.map(renderTagItem)}
          {tags?.length === 0 ? <></> : (
            <>
              <Spacer height={32} />
              <Block row alignCenter>
                <Button block preset="secondary" text="Create tag" onPress={_onCreateTag} />
                <Spacer width={'normal'} />
                <Button block preset="primary" isUseColorDisabledForText disabled={_shouldDisabled} text="Add tag" onPress={_onSelectTags} />
              </Block>
            </>
          )}
          <Spacer height={insets.bottom + 16} />
        </Block>
      ) : <></>}
    </RNModal>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  iconClose: {
    width: 24,
    height: 24,
  },
  block: {
    backgroundColor: theme.background,
    paddingHorizontal: SpacingDefault.medium,
  },
  buttonItem: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconFlag: {
    width: 32,
    height: 32,
  },
  iconCheck: {
    width: 24,
    height: 24,
  },
  iconEmpty: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
}));

export default SelectTagModal;
