import { createStackNavigator } from 'react-navigation';
import Main from './app/components/Main';
import Dashboard from './app/components/Dashboard';
import Profile from './app/components/Profile';
import Repositories from './app/components/Repositories';
import Web from './app/components/helpers/WebView';

const App = createStackNavigator(
  {
    Home: { screen: Main },
    Dashboard: { screen: Dashboard },
    Profile: { screen: Profile },
    Repos: { screen: Repositories },
    WebView: { screen: Web },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default App;
