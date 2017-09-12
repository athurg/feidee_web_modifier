/******************** 以下为函数定义 *******************/
//定义观察器回调：当添加节点时，执行fix
function mutationCallback(mutations, observer) {
	mutations.forEach(function(mutation) {
		if (mutation.addedNodes.length==0) {
			return
		}

		//更新背景色，当日入账金额大于0，就显示为绿色的
		$("div.nameMoney span.money").each(function(){
			//获取当日入账金额，如果为0则跳过
			if (parseFloat($(this).text()) == 0) {
				return
			}

			$(this).parent().parent().removeClass("old");

			//否则修正背景色
			//$(this).parent().css("background-color", "#009900");
		});
	});
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
		$('dl#tip_list_dl span.tip_dd_money').each(function(){
			if ($(this).hasClass("money_total")) {
				return;
			}
			total += parseFloat($(this).text());
		});
		//保留两位小数
		total = (total * 100).toFixed() / 100

		//更新总金额的DOM变更操作不需要处理，否则会进入死循环
		if (mutation.target.classList.contains("money_total")) {
			return
		}

		//检查总金额显示栏，如果存在就更新
		money_total_span = $('dl#tip_list_dl span.tip_dt_money.money_total')
		if (money_total_span.length != 0) {
			$(money_total_span).html(total);
			return;
		}

		//如果不存在则手动添加
		html = 
			'<dt>' +
			'	<span class="tip_dt_name">金额累加</span>' +
			'	<span class="tip_dt_money money_total">' + total + '</span>' +
			'</dt>' +
			'<dd>' + 
			'	<div>' +
			'		<span class="tip_dd_name"></span>' +
			'		<span class="tip_dd_money money_total"></span>' +
			'	</div>' +
			'	<div class="tips-memo"></div>' +
			'</dd>';

		$('dl#tip_list_dl').prepend(html);
	});
}




/******************** 以下为执行代码 *******************/
//调整“周期帐”页面部分入账日期的样式
try {
	target = document.querySelector('table#calendar');
	if (target!=null) {
		new MutationObserver(mutationCallback).observe(target, {childList: true, subtree: true});
	}
}catch(e){
	console.log(e);
}

//添加／更新“周期帐”顶级导航项
try{
	duplicateBillNavItem();
}catch(e){
	console.log(e);
}

//添加／更新“周期帐”入账弹出页面的金额汇总信息
try{
	target = document.querySelector('dl#tip_list_dl');
	if (target!=null) {
		new MutationObserver(calendarTipMutationCallback).observe(target, {childList: true, subtree: true});
	}
}catch(e){
	console.log(e);
}

//给“记账”页面条目清单中的转账条目增加“转”的文本标志
try{
	target = document.querySelector('div#list');
	if (target!=null) {
		callback = function(){
			$("span.typename2").html('(转)');
		};
		new MutationObserver(callback).observe(target, {childList: true});
	}
}catch(e){
	console.log(e);
}
