import React from 'react';
import Navigator from './src/navigation';
import { QrCardObject } from './src/components/QRCard';
import { ApplicationContext } from './ApplicationContext';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';
const LOCAL_STORAGE_KEY = 'LOCAL_STORAGE_KEY';

interface AppProps {}
interface AppState {
  list: QrCardObject[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      list: [],
    };
  }
  setValue = (key: keyof AppState, value: any) => {
    this.setState({ [key]: value } as Pick<AppState, keyof AppState>);
  };

  addToList = (code: QrCardObject) => {
    const newList = [...this.state.list, code];
    this.saveList(newList);
    this.setState({ list: newList });
  };

  removeFromList = (uuid: string, list: QrCardObject[]) => {
    const filteredList = _.remove(list, obj => obj.uuid !== uuid);
    this.saveList(filteredList);
    this.setState({ list: filteredList });
  };
  saveList = async (list: QrCardObject[]) => {
    try {
      const listAsJSONString = JSON.stringify(list);
      await AsyncStorage.setItem(LOCAL_STORAGE_KEY, listAsJSONString);
    } catch (error) {
      console.log(error);
    }
  };

  getList = async () => {
    try {
      const listAsJSONString = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
      if (listAsJSONString !== null) {
        const list = JSON.parse(listAsJSONString);
        this.setState({ list });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ApplicationContext.Provider
        value={{
          list: this.state.list,
          addToList: this.addToList,
          removeFromList: this.removeFromList,
          saveList: this.saveList,
          getList: this.getList,
        }}
      >
        <Navigator />
      </ApplicationContext.Provider>
    );
  }
}
