/**
 * babel-polyfill测试代码
 */
import 'babel-polyfill'; // 在没有引入babel-polyfill之前，不会引入处理es6某些语法的代码
function timeOut() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout')
        }, 1000)
    })
}
timeOut().then(result => {
    console.log(result);
})