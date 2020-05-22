import React from 'react';
import {Text} from 'react-native';
import {connect, Link} from 'umi';
import {List} from '@ant-design/react-native';

function IndexPage({greeting, loading}) {
  return (
    <List renderHeader={() => <Text>{loading ? 'Loading...' : greeting}</Text>}>
      <Link to="/home?foo=bar" component={List.Item} arrow="horizontal">
        Go to home
      </Link>
      <Link to="/login" component={List.Item} arrow="horizontal">
        Go to login
      </Link>
    </List>
  );
}

const ConnectedIndexPage = connect(({foo: {greeting}, loading: {effects}}) => ({
  greeting,
  loading: effects['foo/fetch'],
}))(IndexPage);

export default ConnectedIndexPage;
