import React, {useLayoutEffect} from 'react';
import {List, Modal, Button} from '@ant-design/react-native';
import {StatusBar} from 'react-native';
import {Link} from 'umi';

function SettingsPage({navigation}) {
  // 导航条右侧按钮点击事件
  function onHeaderRightPress() {
    Modal.alert('Title', 'alert content', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel');
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('ok');
        },
      },
    ]);
  }

  useLayoutEffect(() => {
    // 添加导航条右侧按钮示例
    navigation.setOptions({
      headerRight: () => (
        <Button type="primary" size="small" onPress={onHeaderRightPress}>
          弹窗
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <List>
        <Link to="/login" component={List.Item} arrow="horizontal">
          登录
        </Link>
      </List>
    </>
  );
}

SettingsPage.title = '设置';
SettingsPage.headerTintColor = '#000000';
SettingsPage.headerTitleStyle = {
  fontWeight: 'bold',
};
SettingsPage.headerStyle = {
  backgroundColor: '#ffffff',
};

export default SettingsPage;
