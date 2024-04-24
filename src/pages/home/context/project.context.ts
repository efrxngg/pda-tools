import {createContext} from 'react';
import {IProjectContext} from '../interfaces/i-project.context.ts';

export const ProjectContext = createContext<IProjectContext | undefined>(undefined);