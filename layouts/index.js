import React from 'react';
import {BackButton} from 'umi';
import {WhiteSpace} from '@ant-design/react-native';

export default function Layout({children}) {
  return (
    <BackButton>
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      {children}
    </BackButton>
  );
}
