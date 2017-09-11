//更新背景色，当日入账金额大于0，就显示为绿色的
function fixCalendar() {
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

		fixCalendar();
	});
}

//启动“周期帐”日历视图的观察器
function loadCalendarObserver() {
	//对id为calendar的table启动观察器
	observer = new MutationObserver(mutationCallback);
	table = document.querySelector('table#calendar');
	if (table==null) {
		return;
	}
	observer.observe(table, {childList: true, subtree: true});
}

//复制一个“周期帐”的导航项目，并放在顶层
function duplicateBillNavItem() {
	//找到被隐藏的“周期帐”导航链接
	archor = $("a.g-top-bill-g");

	//克隆一个“记账”导航项，修改链接地址和链接信息
	var navLi = $("li.l-tally").first().clone();
	$(navLi).find("a").html(archor.html());
	$(navLi).find("a").attr("href", archor.attr("href"));
	$(navLi).addClass("l-bill");
	$(navLi).removeClass("l-tally");

	//切换导航栏是否是选中状态
	$(navLi).removeClass("select");
	if (window.location.pathname == "/money/bill/index.do") {
		$(navLi).addClass("select");
	}

	//将克隆的导航项放在“记账”导航项目前面（CSS样式匹配后界面显示为后面）
	$("li.l-tally").before(navLi);
}

//tip列表观察器回调
function calendarTipMutationCallback(mutations, observer) {
	mutations.forEach(function(mutation) {
		//计算总金额
		var total = 0.0;
		$('dl#tip_list_dl dt span.tip_dt_money').each(function(){
			if ($(this).hasClass("money_total")) {
				return;
			}
			total += parseFloat($(this).text());
		});

		//检查总金额显示栏，如果存在就更新
		money_total_span = $('dl#tip_list_dl span.tip_dd_money.money_total')
		if (money_total_span.length != 0) {
			$(money_total_span).html(total);
			return;
		}

		//如果不存在则手动添加
		html  = '<dt>';
		html += '<span class="tip_dt_name">金额累加</span>';
		html += '<span class="tip_dt_money money_total">' + total + '</span>';
		html += '</dt>';
		html += '<dd><div>';
		html += '<span class="tip_dd_name"></span>';
		html += '<span class="tip_dd_money money_total"></span>';
		html += '</div><div class="tips-memo"></div></dd>';

		$('dl#tip_list_dl').prepend(html);
	});
}

//“周期帐”日历视图提示弹框的观察器
function loadCalendarTipObserver() {
	observer = new MutationObserver(calendarTipMutationCallback);
	div = document.querySelector('dl#tip_list_dl');
	if (div==null) {
		console.log("没有找到TIP div");
		return;
	}
	observer.observe(div, {childList: true});
}

loadCalendarObserver();
duplicateBillNavItem();
loadCalendarTipObserver();
