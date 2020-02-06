import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import * as styles from '../styles';
import Button from '../components/Button';
import { ApplicationContext, contextProps } from '../../ApplicationContext';
import { ScrollView } from 'react-native-gesture-handler';
import QRCard from '../components/QRCard';
import Card from '../components/Card';

interface HomeProps {
  navigation: NavigationStackProp;
  context: contextProps;
}

interface HomeState {}

class HomeScreen extends React.Component<HomeProps, HomeState> {
  static contextType = ApplicationContext;
  componentDidMount() {
    //const context = React.useContext(ApplicationContext);
    //context.getList();
    this.context.getList();
  }
  render() {
    return (
      <ApplicationContext.Consumer>
        {context => (
          <View style={homeStyles.root}>
            <View style={homeStyles.buttonContainer}>
              <Button
                action={() => this.props.navigation.navigate('scanScreen')}
                extraStyle={homeStyles.buttonStyle}
                rounded
              >
                <Text style={homeStyles.buttonTextStyle}>Scan Codes</Text>
              </Button>
            </View>
            <ScrollView>
              <View style={homeStyles.listStyle}>
                {context.list.map(object => (
                  <QRCard
                    key={object.uuid}
                    data={object}
                    deleteCommand={() =>
                      context.removeFromList(object.uuid, context.list)
                    }
                  />
                ))}
                {context.list.length < 1 && this.renderNoCodesSaved()}
              </View>
            </ScrollView>
          </View>
        )}
      </ApplicationContext.Consumer>
    );
  }

  renderNoCodesSaved = () => {
    return (
      <Card label="No codes saved yet">
        <Text>
          Whenever you save a code it will end up here on this screen for
          further inspection
        </Text>
      </Card>
    );
  };
}

const homeStyles = StyleSheet.create({
  root: {
    backgroundColor: styles.colors.backGroundColor,
    width: styles.metrics.screenWidth,
    height: '100%',
  },
  buttonContainer: {
    width: styles.metrics.screenWidth,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    width: styles.metrics.screenWidth * 0.75,
    borderColor: '#000',
    borderWidth: 0.05,
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,

    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 1 },
    textShadowRadius: 1,
  },
  listStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
