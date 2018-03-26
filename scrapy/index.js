const puppeteer = require('puppeteer');
let scenicspot = require('./model/scenicspot');

function getList() {

}

(async () => {
    let allJDInfo = [];
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('http://www.mafengwo.cn/jd/10575/gonglve.html');

    async function getAllScenicSpot() {
        let allScenicSpot = [];        
        for (let i = 1;i <= 1;i++) {
            try {
                let list = await page.evaluate((page) => {
                    console.log('当前第：' + page + '页');
                    return new Promise((resolve, reject) => {
                        console.log(page);
                        let xhr = new XMLHttpRequest();
                        
                        let data = `sAct=KMdd_StructWebAjax|GetPoisByTag&iMddid=10575&iTagId=0&iPage=${page}`;
            
                        xhr.open('post', '/ajax/router.php', true);
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
                        xhr.send(encodeURI(data));
            
                        xhr.onreadystatechange = () => {
                            if(xhr.readyState === 4) {
                                if (xhr.status >= 200 && xhr.status <= 300) {
                                    let result = []
                                    let data = JSON.parse(xhr.responseText).data.list;
                                    let element = document.createElement('div');
                                    element.innerHTML = data;
                                    for (let i = 0;i < element.children.length;i++) {
                                        let obj = {};
                                        obj.title = element.children[i].querySelector('a').title;
                                        obj.ssHref = element.children[i].querySelector('a').href;
                                        obj.imgSrc = element.children[i].querySelector('img').src;
                                        console.log(obj);
                                        result.push(obj);
                                    }
                                    resolve(result);
                                }
                                else {
                                    resolve('错误');
                                }
                            }
                        }
                    });
                }, i);
                allScenicSpot.push(...list);
            }
            catch (e) {
                console.log(e);
                await browser.close();
            }
            // break;
        }
        return allScenicSpot;
    }


    // 关闭浏览器
    await browser.close();
})();