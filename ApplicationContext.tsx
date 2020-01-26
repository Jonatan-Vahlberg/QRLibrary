import * as React from 'react';
import { QrCardObject } from './src/components/QRCard';

export type contextProps = {
  list: QrCardObject[];
  addToList: (code: QrCardObject) => void;
  removeFromList: (uuid: string, list: QrCardObject[]) => void;
  saveList: (list: QrCardObject[]) => Promise<void>;
  getList: () => Promise<void>;
};

export const ApplicationContext = React.createContext<Partial<contextProps>>(
  {},
);
