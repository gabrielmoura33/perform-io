import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';

import theme from '../../global/styles/theme';
import { UserAuthRoutes } from '../../modules/User/routes/user_auth.routes';
import FavoriteMusicStyle from '../../modules/User/screens/FavoriteMusicStyle';
import SignIn from '../../modules/User/screens/SignIn';
import SignUp from '../../modules/User/screens/SignUp';
import UserIdentification from '../../modules/User/screens/UserIdentification';
import ChooseState from '../screens/ChooseState';
import SocialLogin from '../screens/SocialLogin';
import UserBirthDate from '../screens/UserBirthDate';

const ChooseStateStack = createStackNavigator();

const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const ChooseStateRoutes: React.FC = () => (
  <ChooseStateStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.Secondary },
      cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
    }}
    initialRouteName="ChooseState"
  >
    <ChooseStateStack.Screen name="ChooseState" component={ChooseState} />
    <ChooseStateStack.Screen name="SocialLogin" component={UserAuthRoutes} />
    <ChooseStateStack.Screen name="SignIn" component={SignIn} />
    <ChooseStateStack.Screen name="SignUp" component={SignUp} />
    <ChooseStateStack.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <ChooseStateStack.Screen name="UserBirthDate" component={UserBirthDate} />
    <ChooseStateStack.Screen
      name="FavoriteMusicStyle"
      component={FavoriteMusicStyle}
    />
  </ChooseStateStack.Navigator>
);

export default ChooseStateRoutes;
