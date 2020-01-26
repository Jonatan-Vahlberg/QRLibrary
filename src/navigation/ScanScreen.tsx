import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Card from '../components/Card';
import { NavigationStackProp } from 'react-navigation-stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as styles from '../styles';
import Button from '../components/Button';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationEvents, NavigationEventsProps } from 'react-navigation';

interface ScanProps {
  navigation: NavigationStackProp;
  [key: string]: any;
}

interface ScanState {
  scanned: boolean;
  hasPremission?: boolean;
}

class ScanScreen extends React.Component<ScanProps, ScanState> {
  constructor(props: ScanProps) {
    super(props);
    this.state = {
      scanned: false,
      hasPremission: null,
    };
  }

  async componentDidMount() {
    await this.requestCameraPremission();
  }

  requestCameraPremission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPremission: status === 'granted' });
  };

  handleCodeScanned = scannedData => {
    this.setState({ scanned: true });
    this.props.navigation.navigate('scanDetailScreen', { data: scannedData });
  };

  render() {
    const CustomNavigationEvents = (
      <NavigationEvents
        onWillFocus={payload => {
          this.setState({ scanned: false });
        }}
      />
    );

    return (
      <View style={scanStyles.root}>
        {this.state.hasPremission === null && CustomNavigationEvents}
        {this.state.hasPremission === false &&
          this.renderPremissionNotGranted(CustomNavigationEvents)}
        {this.state.hasPremission === true &&
          this.renderBarCodeScanner(CustomNavigationEvents)}
      </View>
    );
  }

  renderPremissionNotGranted = (CustomNavigationEvents: JSX.Element) => {
    return (
      <React.Fragment>
        <Card
          label="Premission denied"
          labelStyle={{ color: styles.colors.redHighlight }}
        >
          <Text style={scanStyles.premissionTextStyle}>
            The application needs your explicit premission to access the camera.
            This is to be able to scan barcodes and Qr-codes
          </Text>
          <View style={scanStyles.buttonContainer}>
            <Button action={() => this.requestCameraPremission()} rounded>
              <Text style={scanStyles.buttonTextStyle}>Re-request</Text>
            </Button>
            <Button
              action={() => this.props.navigation.navigate('homeScreen')}
              rounded
              outline
            >
              <Text
                style={[
                  scanStyles.buttonTextStyle,
                  scanStyles.buttonTextStyleOutline,
                ]}
              >
                Return
              </Text>
            </Button>
          </View>
        </Card>
        {CustomNavigationEvents}
      </React.Fragment>
    );
  };

  renderBarCodeScanner = (CustomNavigationEvents: JSX.Element) => {
    return (
      <React.Fragment>
        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned ? undefined : this.handleCodeScanned
          }
          style={scanStyles.scannerStyle}
        />
        {CustomNavigationEvents}
        <Button
          action={() => this.props.navigation.navigate('homeScreen')}
          rounded
        >
          <Text style={[scanStyles.buttonTextStyle]}>Return</Text>
        </Button>
      </React.Fragment>
    );
  };
}

const scanStyles = StyleSheet.create({
  root: {
    backgroundColor: styles.colors.backGroundColor,
    width: styles.metrics.screenWidth,
    height: styles.metrics.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,

    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 1 },
    textShadowRadius: 1,
  },
  buttonTextStyleOutline: {
    color: styles.colors.darkerBasicBlue,
  },
  premissionTextStyle: {
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: styles.colors.redHighlight,
  },
  scannerStyle: {
    width: styles.metrics.screenWidth * 0.95,
    aspectRatio: 1,
  },
});

export default ScanScreen;
