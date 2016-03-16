import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// 外链样式
import s from './test.scss';

// 图片测试
import url from './logo.png'

s._insertCss();
// 行内样式 
let style = {
	background : '#eee',
	fontSize : '20px',
	textAlign : 'center',
	padding : '10px'
}

class Test extends Component {
	render (){
		return( <div style={style}>
					<img src={url}/>
					<h2 className={s.title}>Welcome Wn518</h2>
					<h2 className={s.red}>Webpack React</h2>
				</div> )
	}
} 

export default Test;