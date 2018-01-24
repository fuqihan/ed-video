import * as React from 'react';
import Fheader from './page/header/header';
import RouterView from './router/homeRouter';

class Main extends React.Component<{}, {}> {
  componentWillMount(): void {
    console.log('123');
  }
  render() {
    // const { languageName } = this.props;
    return (
      <div>
        <Fheader />
        <RouterView />
      </div>
    );
  }
}

export default Main;