const puppeteer = require("puppeteer");
const accountList = [
  {
    account: "peng10@qq.com",
	passWord: "aaa11111",
	url:'http://clingo-order.llssite.com/cc-template-match?pageName=uno-overlordpresale',
	name:"darwin-pt后"
  },
  {
    account: "peng10@qq.com",
	passWord: "aaa11111",
	url:'http://clingo-order.llssite.com/cc-template-match?pageName=uno-privilegepresale',
	name:"darwin-特权页"
  },
  {
    account: "peng10@qq.com",
	passWord: "aaa11111",
	url:'http://clingo-order.llssite.com/cc-template-match?pageName=uno-darwinpresale',
	name:"darwin-老app"
  },
  {
    account: "peng10@qq.com",
	passWord: "aaa11111",
	url:'http://clingo-order.llssite.com/cc-template-match?pageName=uno-alixpresale',
	name:"darwin-alix投放"
  },
  
	
]
const autoUiTest = async ({account,passWord,url,name})=>{
	const browser = await puppeteer.launch({
		// 是否开启headless模式
		headless: true,
	});
	
	const page = await browser.newPage();
	await page.goto(
		`https://lls-eruda-snippets.fe.liulishuo.com/login?r=${encodeURIComponent(url)}`
	);

	await page.setViewport({ width: 375, height: 667 });

	// 输入账号
	const accountElement = await page.$(
		"body > main > form > .form-item:nth-child(2) > .form-input"
	);
	await accountElement.type(account, { delay: 100 });
	// 输入密码
	const passwordElement = await page.$(
		"body > main > form > .form-item:nth-child(3) > .form-input"
	);
	await passwordElement.type(passWord, { delay: 100 });
	// 点击登录
	await page.click("body #submit");

	await page.waitForNavigation({
		waitUntil: ['networkidle0','networkidle2','load','domcontentloaded']
	});
	// 点击关闭奖学金弹窗
	if(await page.$("div > .active > .lls-ui-modal > .lls-ui-modal-footer > .lls-ui-icon")){
		await page.click(
			"div > .active > .lls-ui-modal > .lls-ui-modal-footer > .lls-ui-icon"
		);
	}
	
	// 等待奖学金弹窗关闭
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await page.screenshot({
		path: `./${name}.png`, //图片保存路径
		type: "png",
		fullPage:true
	});
	await browser.close();
}
(async () => {
	accountList.forEach(account=>{
		autoUiTest(account)
	})
})();
