/*
 “周期账”页面的修改
 */

//“周期帐”页面背景色更新回调
function calendarBackgroundUpdateCallback(mutations, observer) {
  mutations.forEach(function(mutation) {
    var spans=null;
    if (mutation.target.tagName=="TBODY") {
      //整月刷新
      spans = mutation.target.querySelectorAll("span.money");
    } else if (mutation.target.tagName=="SPAN" && mutation.target.classList.contains("money")) {
      //单个日期刷新
      spans = [mutation.target];
    }

    if (spans==null || spans.length==0) {
      return;
    }

    for (i=0; i<spans.length; i ++ ) {
      span = spans[i];
      //金额为0表示未入账，不作修改
      if (parseFloat(span.innerText)==0) {
        continue;
      }

      //如果金额为0但不包含old样式，表示已入账或者尚未到达日期，这个时候不应该包含part样式
      if (!span.parentNode.parentNode.classList.contains("old")) {
        span.parentNode.parentNode.classList.remove("part");
        continue;
      }

      //如果金额为0且包含old样式，表示已部分入账。应该修改old样式为part样式
      span.parentNode.parentNode.classList.remove("old");
      span.parentNode.parentNode.classList.add("part");
    }
  });
}

//tip列表观察器回调
function calendarTipMutationCallback(mutations, observer) {
  //检查总金额显示栏，如果存在则清空，否则就添加
  money_total_span = $('div#tip_list_bottom span.money_total')
  if (money_total_span.length != 0) {
    $(money_total_span).html('')
  } else {
    html = '	<span class="money_total"></span>';
    $('div#tip_list_bottom').prepend(html);
  }

  $("dl#tip_list_dl input").keyup( () => {
    var total = 0
    let inputs = $("dl#tip_list_dl :text")
    for (input of inputs) {
      let v = parseFloat($(input).val())

      //如果输入非法数字，则标红输入内容
      if (isNaN(v)) {
        $(input).css("color", "red")
        continue
      }

      $(input).css("color", "")
      total += v
    }

    $('div#tip_list_bottom span.money_total').html("<strong>总金额:</strong> " + total);
  });
}

if (window.location.pathname.match(/\/bill\/index.do$/)) {
  //调整“周期帐”页面部分入账日期的样式
  try {
    $('div.tipColor ul').append('<li><a class="backgroundGreen" style="background-color:#898922"></a><li style="padding-top: 6px;">部分入账</li>');
    target = document.querySelector('table#calendar');
    if (target!=null) {
      new MutationObserver(calendarBackgroundUpdateCallback).observe(target, {childList: true, subtree: true});
    }
  }catch(e){
    console.log(e);
  }

  //添加／更新“周期帐”入账弹出页面的金额汇总信息
  try{
    target = document.querySelector('dl#tip_list_dl');
    if (target!=null) {
      new MutationObserver(calendarTipMutationCallback).observe(target, {childList: true});
    }
  }catch(e){
    console.log(e);
  }
}
