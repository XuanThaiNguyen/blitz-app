import React, {useEffect, useRef, useState} from 'react'
import {FlatList, ScrollView, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

import {Block} from '../../../components/Block/Block'
import Button from '../../../components/Button/Button'
import Container from '../../../components/Container/Container'
import Header from '../../../components/Header/Header'
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute'
import {Spacer} from '../../../components/Spacer/Spacer'
import {Typo} from '../../../components/Typo/Typo'
import {Theme, useTheme} from '../../../context/ThemeProvider'
import {ProjectProps} from '../../../model/Project.props'
import {ApiStatus} from '../../../services/api/ApiStatus'
import {getProjects} from '../../../services/api/project'
import colors from '../../../themes/Colors'
import images from '../../../themes/Images'
import {SpacingDefault} from '../../../themes/Spacing'
import {TASKS_BY_STATUS_WITH_SEARCH} from '../constant/Constant'
import {TasksStatusSearch} from '../constant/Model.props'

const MyProjects = () => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const refScrollView = useRef<ScrollView>(null);

  const [selectedChip, setSelectedChip] = useState<TasksStatusSearch>(TASKS_BY_STATUS_WITH_SEARCH[0]);
  const [projects, setProjects] = useState<ProjectProps[]>([]);

  useEffect(() => {
    onGetProjects()
  }, [])

  const onGetProjects = async () => {
    try {
      const {data} = await getProjects();
      if (data?.status === ApiStatus.OK && data?.data?.length) {
        setProjects(data?.data)
      }
    } catch (err: any) {
      console.log('errr', err);
    }
  };

  const _renderRight = () => {
    return (
      <Button>
        <FastImage source={images.ic_search} style={styles.iconSearch} tintColor={theme.primaryText} />
      </Button>
    )
  }

  const onSelectChip = (item: TasksStatusSearch) => () => {
    setSelectedChip(item);
  }

  const _renderStatusItem = (item: TasksStatusSearch, index: number) => {
    const lastIndex = TASKS_BY_STATUS_WITH_SEARCH.length - 1 === index;
    const _selectedChip = item === selectedChip;

    return (
      <Button key={item.key}
        onPress={onSelectChip(item)}
        style={[styles.statusItem, lastIndex ? styles.lastIndexStatusItem : {}, _selectedChip ? styles.selectedStatusItem : {}]}>
        <Typo text={item.title} preset={_selectedChip ? 'b16' : 'r16'} color={_selectedChip ? colors.white : theme.primaryText} />
      </Button>

    )
  }

  const renderItem = ({item}: {item: ProjectProps}) => {
    return (
      <Button style={[styles.projectBlock, styles.shadow]}>
        <Typo text={item.projectInfo.title || ''} preset="b16" color={theme.primaryText} />
        <Spacer height={8} />
        <Block row alignCenter justifyContent="space-between">
          <Typo text={item.projectInfo.status || ''} preset="r14" color={theme.primaryText} />
          <Block row alignCenter>
            <Typo text={`${item?.tasks?.length || 0} tasks`} preset="r14" color={theme.secondaryText} />
          </Block>
        </Block>
      </Button>
    )
  }

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="My Projects" renderRight={_renderRight} />
      <Spacer height={16} />
      <Block>
        <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer} showsHorizontalScrollIndicator={false} ref={refScrollView}>
          {TASKS_BY_STATUS_WITH_SEARCH.map(_renderStatusItem)}
        </ScrollView>
      </Block>
      <Spacer height={24} />
      <FlatList
        data={projects}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollViewContainer} />
    </Container>
  )
}

const useStyles = ((theme: Theme) => StyleSheet.create({
  iconSearch: {
    width: 24,
    height: 24,
  },
  scrollViewContainer: {
    paddingHorizontal: SpacingDefault.normal
  },
  projectBlock: {
    paddingVertical: 16,
    paddingHorizontal: SpacingDefault.normal,
    backgroundColor: theme.background,
    marginBottom: 16,
    borderRadius: 8
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 10,
    shadowRadius: 1,
    elevation: 5
  },
  statusItem: {
    marginRight: SpacingDefault.smaller,
    paddingHorizontal: SpacingDefault.small,
    paddingVertical: 4,
    backgroundColor: theme.backgroundBox,
    borderRadius: 100
  },
  lastIndexStatusItem: {
    marginRight: SpacingDefault.none
  },
  selectedStatusItem: {
    backgroundColor: colors.primary
  }
}))

export default MyProjects