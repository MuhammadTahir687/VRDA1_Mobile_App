/**
 * @format
 */

import {AppRegistry,PermissionsAndroid} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

AppRegistry.registerComponent(appName, () => App);
