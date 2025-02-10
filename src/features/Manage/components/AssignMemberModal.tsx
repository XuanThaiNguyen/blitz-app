import React, {useContext, useMemo, useRef, useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDebounce} from 'use-debounce';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, ThemeContext} from '../../../context/ThemeProvider';
import {User} from '../../../redux/user';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';

interface AssignMemberModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  members?: User[];
  selectedMember?: User;
  onSelectMember: (assigneeId: string) => void;
}

const AssignMemberModal = ({isVisible, onCloseModal, members, selectedMember, onSelectMember}: AssignMemberModalProps) => {
  const insets = useSafeAreaInsets();
  const {theme, isDark} = useContext(ThemeContext);
  const styles = useStyles(theme);

  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState<string | undefined>(undefined);
  const [searchTouched, setSearchTouched] = useState(false);
  const [searchDebounce] = useDebounce(search, 500);

  const [currentMember, setCurrentMember] = useState<User | null>(selectedMember || null);
  const currentMemberRef = useRef<any>(currentMember);

  const onChangeMember = (user: User) => () => {
    setCurrentMember(user)
  }

  const membersOnSearch = useMemo(() => {
    if (!isEmpty(searchDebounce)) {
      return members?.filter(member => member.profileInfo.email.toLowerCase().includes(searchDebounce.toLowerCase()));
    }

    return members;
  }, [searchDebounce])

  const onAssign = () => {
    onSelectMember(currentMember?._id || '')
    currentMemberRef.current = currentMember;
    onCloseModal()
  }

  const renderMember = (item: User, index: number) => {
    const isSelected = currentMember?._id === item._id;

    return (
      <Button onPress={onChangeMember(item)} style={styles.buttonChangeMember} key={`${item._id}-${index}`}>
        <Block row alignCenter>
          <FastImage source={{uri: item?.profileInfo?.avatar}} style={styles.avatar} />
          <Spacer width={'small'} />
          <Block>
            <Block row alignCenter>
              <Typo text={item?.profileInfo?.fullname} preset="b16" color={theme.primaryText} />
              <Spacer width={'small'} />
            </Block>
            <Spacer height={4} />
            <Typo text={item?.profileInfo?.email} preset="r14" color={theme.primaryText} />
          </Block>
        </Block>
        {isSelected ? (
          <FastImage source={images.ic_check} style={styles.iconCheck} tintColor={colors.primary} />
        ) : <></>}
      </Button>
    )
  }

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Block style={styles.block}>
            <Spacer height={32} />
            <Block block>
              <Button onPress={onCloseModal} style={styles.buttonClose}>
                <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
              </Button>
              <Spacer height={24} />
              <Typo preset="b16" color={theme.primaryText} text="Assign Member" />
              <Spacer height={24} />
              <TextField
                value={search}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={setSearch}
                placeholder="Search Member"
                onBlur={() => setSearchTouched(true)}
                error={searchError && searchTouched}
                errorMessage={searchError} />
              <Spacer height={32} />
              <ScrollView bounces={false} >
                {membersOnSearch?.map(renderMember)}
              </ScrollView>
              <Spacer height={16} />
            </Block>
            <Button preset="primary" text="Assign" onPress={onAssign} disabled={currentMemberRef.current?._id === currentMember?._id} />
            <Spacer height={insets.bottom + 16} />
          </Block>
        </TouchableWithoutFeedback>
      ) : <></>}
    </RNModal>
  )
}

const AVATAR_SIZE = 40;

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
    height: SpacingDefault.height / 1.3,
  },
  buttonChangeMember: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2
  },
  iconCheck: {
    width: 24,
    height: 24
  }
}));

export default AssignMemberModal