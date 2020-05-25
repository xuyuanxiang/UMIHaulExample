import React from 'react';
import {ActivityIndicator} from '@ant-design/react-native';

export default function Loading() {
  return <ActivityIndicator animating toast size="large" text="正在加載" />;
}
