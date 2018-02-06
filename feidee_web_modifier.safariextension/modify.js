/*
 所有页面的公共修改
 */

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
  if (window.location.pathname == "/bill/index.do" || window.location.pathname == "/money/bill/index.do") {
    $(navLi).addClass("select");
  }

  //将克隆的导航项放在“记账”导航项目前面（CSS样式匹配后界面显示为后面）
  $("li.l-tally").before(navLi);
}

//添加／更新“周期帐”顶级导航项
try{
  duplicateBillNavItem();
}catch(e){
  console.log("添加“周期账”导航失败", e);
}
