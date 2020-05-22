import React from 'react';
import {View} from 'react-native';

export default function Layout({children}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {children}
    </View>
  );
}
