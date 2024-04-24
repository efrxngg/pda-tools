import {ProjectOrder} from './ProjectOrder.ts';

export interface IProjectContext {
  selectedProjectIndex: number | undefined;
  projectOrders: ProjectOrder[];
  updateProject: (project: ProjectOrder) => void;
}