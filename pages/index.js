import React from 'react';
import {StatusBar} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {connect} from 'umi';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../tabs/HomeScreen';
import ProfileScreen from '../tabs/ProfileScreen';
const {Navigator, Screen} = createBottomTabNavigator();

function IndexPage() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigator>
        <Screen
          name="主页"
          options={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              // You can return any component that you like here!
              return <Icon size={size} name="home" color={color} />;
            },
          })}
          component={HomeScreen}
        />
        <Screen
          name="我的"
          options={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              // You can return any component that you like here!
              return <Icon size={size} name="profile" color={color} />;
            },
          })}
          component={ProfileScreen}
        />
      </Navigator>
    </>
  );
}

const ConnectedIndexPage = connect(({foo, loading: {effects}}) => ({
  greeting: foo.greeting,
  loading: effects['foo/fetch'],
}))(IndexPage);

ConnectedIndexPage.title = '收钱吧';
ConnectedIndexPage.headerTintColor = '#ffffff';
ConnectedIndexPage.headerTitleStyle = {
  fontWeight: 'bold',
};
ConnectedIndexPage.headerStyle = {
  backgroundColor: '#000000',
};

export default ConnectedIndexPage;
