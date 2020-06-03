import React from 'react';
import {Button, InputItem, List, Checkbox} from '@ant-design/react-native';
import {StatusBar} from 'react-native';

const AgreeItem = Checkbox.AgreeItem;
const CheckboxItem = Checkbox.CheckboxItem;

function LoginPage() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <List>
        <InputItem>账号</InputItem>
        <InputItem type="password">密码</InputItem>
        <AgreeItem>
          Agree agreement agreement agreement agreement agreement agreement
          agreement
        </AgreeItem>
        <CheckboxItem>Remember me</CheckboxItem>
        <List.Item>
          <Button type="primary">登录</Button>
        </List.Item>
      </List>
    </>
  );
}

LoginPage.title = '登录';
LoginPage.headerTintColor = '#000000';
LoginPage.headerTitleStyle = {
  fontWeight: 'bold',
};
LoginPage.headerStyle = {
  backgroundColor: '#ffffff',
};

export default LoginPage;
