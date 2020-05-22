import React from 'react';
import {Text} from 'react-native';
import {connect} from 'umi';

function IndexPage({greeting, loading}) {
  return <Text>{loading ? 'Loading...' : greeting}</Text>;
}

const ConnectedIndexPage = connect(({foo: {greeting}, loading: {effects}}) => ({
  greeting,
  loading: effects['foo/fetch'],
}))(IndexPage);

export default ConnectedIndexPage;
