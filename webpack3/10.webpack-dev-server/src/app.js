import './common.css'

var div = document.createElement('div');

div.innerHTML = 'webpack-dev-server';

document.body.appendChild(div);

// accept()启用js的模块热更新
if(module.hot) {
    module.hot.accept();
}