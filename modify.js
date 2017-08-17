//更新背景色，当日入账金额大于0，就显示为绿色的
function fix_calendar() {
	$("div.nameMoney span.money").each(function(){
		//获取当日入账金额，如果为0则跳过
		if (parseFloat($(this).text()) == 0) {
			return
		}

		$(this).parent().parent().removeClass("old");

		//否则修正背景色
		//$(this).parent().css("background-color", "#009900");
	});
}

//定义观察器回调：当添加节点时，执行fix
function mutationCallback(mutations, observer) {
	mutations.forEach(function(mutation) {
		if (mutation.addedNodes.length==0) {
			return
		}

		fix_calendar();
	});
}

//复制一个“周期帐”的导航项目，并放在顶层
function duplicateBillNavItem() {
	//对id为calendar的table启动观察器
	var observer = new MutationObserver(mutationCallback);
	observer.observe(document.querySelector('table#calendar'), {childList: true, subtree: true});

	//找到被隐藏的“周期帐”导航链接
	archor = $("a.g-top-bill-g");

	//克隆一个“记账”导航项，修改链接地址和链接信息
	var nav_li = $("li.l-tally").first().clone();
	$(nav_li).find("a").html(archor.html());
	$(nav_li).find("a").attr("href", archor.attr("href"));

	//将克隆的导航项放在“记账”导航项目前面（CSS样式匹配后界面显示为后面）
	$("li.l-tally").before(nav_li);
}

duplicateBillNavItem();
