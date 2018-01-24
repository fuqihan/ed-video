import * as React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './header.scss';

export interface Props {
    // name: string;
}
class Fheader extends React.Component<Props, object> {
    render() {
        return (
            <div className="header">
                <ul className="header-nav">
                    <li><Link to="/index">首页</Link></li>
                    <li><Link to="/index/login">分类</Link></li>
                    <li><Link to="App">题目</Link></li>
                    <li><Link to="App">社区</Link></li>
                </ul>
                <ul className="header-icon">
                    <li><Icon type="search" /></li>
                    <li><Icon type="shopping-cart" /></li>
                    <li><Icon type="user" /></li>
                </ul>

            </div>
        );
    }
}

export default Fheader;