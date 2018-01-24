import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/type';
import { Carousel } from 'antd';
import './home.scss'

class Home extends React.Component<StoreState> {
  private imgUrl: Array<string> = [
    'http://oxw83yoit.bkt.clouddn.com/17156e86715d3827dfeef24524d6e8ff.blob',
    'http://oxw83yoit.bkt.clouddn.com/8e9ee293ee938b4438ac4c75b618381b.blob'
  ];
  constructor(props: StoreState) {
    super(props);
    this.state = { imgUrl: this.imgUrl };
  }
  componentWillMount(): void {
    console.log(this.state);
  }

  render() {
    // const { languageName } = this.props;
    return (
      <div className="heme">
        <Carousel effect="fade">
          {
            this.imgUrl.map((item, index) => {
              return <img src={item} key={index} width="100%" alt="" />
            })
          }
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  // const { loginModal } = state;
  return {
    languageName: state.languageName
  };
}

export default connect(mapStateToProps)(Home);