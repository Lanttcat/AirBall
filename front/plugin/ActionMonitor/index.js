/**
 * @file 前端监控
 * @author lanyixing
 */


// 统计数据
let timeLog = {},
    actionLog = {};

let ActionMonitor = {};
let initTime = 0;

function nextRouterStayTime(route) {
    // 需要获取所有的路由
    let routeEx = route;
    let preName = route.name;
    // 初始化时间
    if (preName) {
        let timeDiff = (new Date()).getTime() - initTime;

        timeLog[preName] = timeLog[preName] ? timeLog[preName] : 0;
        timeLog[preName] += timeDiff;
    }
        
    initTime = (new Date()).getTime();
}

/**
 * Vue插件入口
 * @param {object} Vue 
 */
function install(Vue) {
    // 用户行为数据统计数据统计
    Vue.directive('actmoni', function (el, binding) {
        el.onclick = function () {
            // 数据统计 需要设计nginx的日志服务系统
        }
    });
}
ActionMonitor.install = install;
export {nextRouterStayTime, ActionMonitor};