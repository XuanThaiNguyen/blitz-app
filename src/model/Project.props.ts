import {TaskProps} from "./Task.props";

export enum ProjectStatus {
  Planning = 'Planning',
  InProgress = 'InProgress',
  Done = 'Done',
  Archived = 'Archived',
}

export interface ProjectProps {
  createdAt: Date | string;
  _id: string;
  documents: {
    urls: string[];
  };
  participantInfo: {
    memberIds: string[];
    ownerId: string;
  };
  projectInfo: {
    color: string;
    description?: string;
    isDefaultProject: boolean;
    status: ProjectStatus;
    title: string;
  };
  tasks?: TaskProps[];
}
