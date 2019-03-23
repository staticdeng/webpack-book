import * as _ from 'lodash';
// import subPageA from './subPageA';
// import subPageB from './subPageB';

/**
下面是命令行运行webpack --config webpack.config.RequireEnsure.js的测试代码：
    // webpack单entry的情况，require.ensure分割的公共模块不能用CommonsChunkPlugin来提取，用require.include指定公共模块
    require.include('./module');
    require.ensure([], function() {
        // 分割./subPageA模块
        var subPageA = require('./subPageA');
    }, 'subPageA');
    require.ensure([], function () {
        var subPageB = require('./subPageB');
    }, 'subPageB');
    // 命令行运行webpack --config webpack.config.RequireEnsure.js代码分割后，查看subPageA.chunck.js和subPageB.chunck.js，
    // 发现他们的公共模块module.js里面代码分别在这两个文件里，这时候需要加上require.include('./module')配置
    // 加上require.include后，会发现公共模块module.js被打包到了pageA.bundle.js，问题解决
 */

// 下面是命令行运行webpack --config webpack.config.import.js的测试代码
import(/* webpackChunkName: 'subPageA' */'./subPageA').then(function(res){
    console.log('import()', res)
})
import(/* webpackChunkName: 'subPageB' */'./subPageB').then(function(res){
    console.log('import()', res)
})

console.log('this is pageA');
export default 'pageA';