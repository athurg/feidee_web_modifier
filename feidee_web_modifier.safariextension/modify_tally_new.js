//“记账”页（/tally/new.do）修改的内容

//账目清单列表中，在每日支出、收入前，增加一个绝对值汇总的信息
function tallyListMutationCallback(mutations, observer) {
  console.log("计算")
  $("div.list-date ul.ul2").each(function(){
    var absTotal = 0.0;


    var income = $(this).find("li.lt-income span").text().replace(",","");
    if (income != null) {
      absTotal += Math.abs(parseFloat(income));
    }

    var payout = $(this).find("li.lt-payout span").text().replace(",","");
    if (payout != null ){
      absTotal += Math.abs(parseFloat(payout));
    }

    $(this).find("li.lt-l").addClass("lt-income");
    $(this).find("li.lt-l").html('绝对值总计：<span style="color:brown">' + absTotal.toFixed(2) + '</span>');
  })
}


//账目清单汇总中，增加一个金额绝对值汇总的信息
function tallyTotalMutationCallback(mutations, observer) {
  //对span.normal的修改是我们自己作出的，这个时候不作处理
  if (mutations.length == 1 && mutations[0].target.nodeName == "SPAN" && mutations[0].target.classList.contains("normal")) {
    return
  }

  var absTotal = 0.0;

  var income = $("ul.ft-total span#ft-income").text().replace(/[,+]/g,"");
  if (income != null) {
    absTotal += Math.abs(parseFloat(income));
  }

  var payout = $("ul.ft-total span#ft-payout").text().replace(/[,+]/g,"");
  if (payout != null ){
    absTotal += Math.abs(parseFloat(payout));
  }

  $("ul.ft-total span.normal").html("收支绝对值汇总：" + absTotal.toFixed(2));
}

//“记账”页面Hack注入
if (window.location.pathname.match(/\/tally\/new.do$/)) {
  //添加“记账”页账目清单列表观察器
  try{
    target = document.querySelector('div#list');
    if (target!=null) {
      new MutationObserver(tallyListMutationCallback).observe(target, {childList: true});
    }
  }catch(e){
    console.log(e);
  }

  //添加“记账”页账目清单汇总观察器
  try{
    target = document.querySelector('ul.ft-total');
    if (target!=null) {
      new MutationObserver(tallyTotalMutationCallback).observe(target, {subtree:true, childList: true});
    } else {
      console.log("Not found tf-toal")
    }
  }catch(e){
    console.log(e);
  }
}
