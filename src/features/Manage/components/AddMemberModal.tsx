import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
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
import {findUser} from '../../../services/api/account';
import {ApiStatus} from '../../../services/api/ApiStatus';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';

interface AddMemberModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  loading?: boolean;
  members?: User[];
  owner?: User;
  onAddMember: (memberIds: string[]) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AddMemberModal = ({isVisible, onCloseModal, loading, members, owner, onAddMember}: AddMemberModalProps) => {
  const insets = useSafeAreaInsets();
  const {theme, isDark} = useContext(ThemeContext);
  const styles = useStyles(theme);

  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState<string | undefined>(undefined);
  const [searchTouched, setSearchTouched] = useState(false);
  const [searchDebounce] = useDebounce(search, 500);
  const [foundUser, setFoundUser] = useState<User | null>(null)

  useEffect(() => {
    if (!isEmpty(searchDebounce)) {
      if (EMAIL_REGEX.test(searchDebounce)) {
        onSearchUser();
        setSearchError(undefined);
      } else {
        setSearchError('Email không đúng định dạng');
      }
    } else {
      setSearchError(undefined);
    }
  }, [searchDebounce])

  const onSearchUser = async () => {
    try {
      const {data} = await findUser(searchDebounce);
      if (data.status === ApiStatus.OK) {
        setFoundUser(data.data)
      }
    } catch (err) {
      console.log('errrr', err);
    }
  }

  const onAddOrRemoveUser = (action: 'add' | 'remove') => () => {
    let _newMembers: string[] = [];
    if (action === 'add') {
      const currentMembers: any = members?.map(member => member._id);;
      _newMembers = [...currentMembers, foundUser?._id];
    } else {
      _newMembers = members?.filter(member => member._id !== foundUser?._id)?.map(ele => ele._id) || [];
    }
    onAddMember(_newMembers)
  }

  const renderLogicRole = useCallback(() => {
    if (foundUser?._id === owner?._id) {
      return (
        <Block bgColor={colors.secondary} pVer={2} paddingHorizontal={SpacingDefault.tiny} borderRadius={4}>
          <Typo text="Owner" preset="b14" color={colors.primary} />
        </Block>
      )
    }

    if (members?.findIndex(member => member?._id === foundUser?._id) !== -1) {
      return (
        <Block bgColor={colors.secondary} pVer={2} paddingHorizontal={SpacingDefault.tiny} borderRadius={4}>
          <Typo text="Added" preset="b14" color={colors.primary} />
        </Block>
      )
    }

    return <></>
  }, [foundUser?._id, owner?._id, members])

  const renderLogicAction = useCallback(() => {
    if (members?.findIndex(member => member?._id === foundUser?._id) !== -1) {
      return (
        <Button loading={loading} textPreset="b16" text="Remove" textColor={colors.primary} onPress={onAddOrRemoveUser('remove')} />
      )
    }

    return <Button loading={loading} textPreset="b16" text="Add" textColor={colors.primary} onPress={onAddOrRemoveUser('add')} />
  }, [members, foundUser?._id, loading])

  const renderEmpty = () => {
    if (!isEmpty(searchDebounce) && !searchError) {
      return (
        <Block center>
          <FastImage source={isDark ? images.empty_dark : images.empty_light} style={styles.iconEmpty} />
          <Spacer height={12} />
          <Typo text="No data" preset="r14" color={theme.secondaryText} />
        </Block>
      )
    }

    return (
      <Block center>
        <FastImage source={isDark ? images.empty_search_dark : images.empty_search_light} style={styles.iconEmpty} />
        <Spacer height={12} />
        <Typo text="Search to find user" preset="r14" color={theme.secondaryText} />
      </Block>
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
            <Button onPress={onCloseModal} style={styles.buttonClose}>
              <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
            </Button>
            <Spacer height={24} />
            <Typo preset="b16" color={theme.primaryText} text="Add Member" />
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
            {!isEmpty(foundUser) ? (
              <Block row alignCenter justifyContent="space-between">
                <Block row alignCenter>
                  <FastImage source={{uri: foundUser?.profileInfo?.avatar}} style={styles.avatar} />
                  <Spacer width={'small'} />
                  <Block>
                    <Block row alignCenter>
                      <Typo text={foundUser?.profileInfo?.fullname} preset="b16" color={theme.primaryText} />
                      <Spacer width={'small'} />
                      {renderLogicRole()}
                    </Block>
                    <Spacer height={4} />
                    <Typo text={foundUser?.profileInfo?.email} preset="r14" color={theme.primaryText} />
                  </Block>
                </Block>
                {renderLogicAction()}
              </Block>
            ) : renderEmpty()}
            <Spacer height={insets.bottom + 16} />
          </Block>
        </TouchableWithoutFeedback>
      ) : <></>}
    </RNModal>
  )
}

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
  iconEmpty: {
    width: 168,
    height: 168
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
}));

export default AddMemberModal