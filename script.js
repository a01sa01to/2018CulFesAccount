var isset=function(variable){
    if(variable===""||variable===null||variable===undefined) return false;
    else return true;
}
$(".fas").click(function(){
    $("#settingMenu").slideToggle();
    $(".fas").slideToggle();
});
$('body').keyup(function(e){
    switch (e.key){
        case "1":
            clicker("donut");
            break;
        case "2":
            clicker("waffle");
            break;
        case "3":
            clicker("drink");
            break;
        case "4":
            clicker("dSet");
            break;
        case "5":
            clicker("wSet");
            break;
        case "6":
            clicker('donut mis');
            break;
        case "7":
            clicker("waffle mis");
            break;
        case "8":
            clicker("drink mis");
            break;
        case "9":
            clicker("dSet mis");
            break;
        case "0":
            clicker("wSet mis");
            break;
        case "Enter":
            clicker("submit");
            break;
        case "/":
            clicker("roomCalcurator_Alice");
            break;
        case "*":
            clicker("roomCalcurator_Bear");
            roomSelector();
            break;
        case "-":
            clicker("roomCalcurator_ok");
            roomSelector();
        /*case "F12":
            $('html').html("");
            break;*/
    }
});

function clicker(id){
    document.getElementById(id).click();
}

function roomSelector(){
    var i=0;
    if($('#roomSelect').val()==="Bear"){ i=1;$('body').css("background-color","antiquewhite");$('#bgcolor').val("#faebd7");}
    else if($('#roomSelect').val()==="Alice"){ i=2;$('body').css('background-color',"aquamarine");$('#bgcolor').val("#7fffd4");}
    else i=0;
    var txt=Array("まずは設定から部屋を選択してください","部屋：くま","部屋：ありす");
    $('#roomId').text(txt[i]);
    hidata($('#roomSelect').val());
}

function hidata(data){
    var selector=$('input[name=room][type=hidden]');
    var submiter=$('input[type=submit]');
    selector.attr('value',data);
    if(isset(selector.attr('value'))){
        submiter.removeAttr('disabled');
    }else{
        submiter.attr('disabled','disabled');
    }
}
var donutRemain=299;
var waffleRemain=299;
class MenuItem{
    constructor(){
        this.price=new Number;
        this.order=0;
        this.name=new String;
        this.earn=new Number;
    }
}

var donut=new MenuItem;
    donut.price=150;
    donut.name="Donut";

var waffle=new MenuItem;
    waffle.price=150;
    waffle.name="Waffle";

var drink=new MenuItem;
    drink.price=100;
    drink.name="Drink";

var dSet=new MenuItem;
    dSet.price=200;
    dSet.name="DonutSet";

var wSet=new MenuItem;
    wSet.price=200;
    wSet.name="WaffleSet";

$('table input[type=button]').click(function(){
    var menu=$(this).attr('id');
    var ordered=new MenuItem;
    if( menu.indexOf( "donut" ) > -1 ){
        ordered=donut;
    }
    else if( menu.indexOf( "waffle" ) > -1 ){
        ordered=waffle;
    }
    else if( menu.indexOf( "drink" ) > -1 ){
        ordered=drink;
    }
    else if( menu.indexOf( "dSet" ) > -1 ){
        ordered=dSet;
    }
    else if( menu.indexOf( "wSet" ) > -1 ){
        ordered=wSet;
    }
    else{
        ordered=null;
    }
    if( menu.indexOf("mis") > -1){
        orderMinus(ordered);
    }else{
        orderPlus(ordered);
    }
});

window.onload=function(){
    var substrin=window.location.search.substring(1);
    var spla=substrin.split('&');
    var query=new Array;
    for(var i=0;i<spla.length;i++){
        var tmp=spla[i].split('=');
        query[tmp[0]]=tmp[1];
    }
    if (isset(query["donutRemain"])) donutRemain=query["donutRemain"];
    if (isset(query["waffleRemain"])) waffleRemain=query["waffleRemain"];
    roomSelector();
    calc();

}

function calc(){
    var items=Array(donut,waffle,drink,dSet,wSet);
    var total=new Number;
    $("#calc").html('<ul>');
    $(items).each(function(){
        this.earn = this.price * this.order;
        
        $("#calc").append('<li>'+this.name + "(\\" + this.price + ")：" + this.order + "個、\\" + this.earn + '</li>');
        total += this.earn;
    });
    $('#calc').append('</ul>');
    $('input[type=hidden][name=donut]').attr('value',donut.order);
        $('input[type=hidden][name=waffle]').attr('value',waffle.order);
        $('input[type=hidden][name=drink]').attr('value',drink.order);
        $('input[type=hidden][name=dSet]').attr('value',dSet.order);
        $('input[type=hidden][name=wSet]').attr('value',wSet.order);
        $('input[type=hidden][name=total]').attr('value',total);
        $('input[type=hidden][name=donutRemain]').attr('value',donutRemain);
        $('input[type=hidden][name=waffleRemain]').attr('value',waffleRemain);
    $('#calc').append('合計：\\' + total);
    $('#calc').append('<br><br>ドーナツ残り：'+donutRemain+'個・ワッフル残り：'+waffleRemain+"個");
}
function orderPlus(menu=new MenuItem){
    menu.order++;
    if(menu===donut||menu===dSet){
        if(donutRemain > 0) donutRemain--;
        else alert('DonutはSold Out');
    }
    else if(menu===waffle||menu===wSet){
        if(donutRemain > 0) waffleRemain--;
        else alert('WaffleはSold Out');
    }
    calc();
}

function orderMinus(menu=new MenuItem){
    if( menu.order === 0){}
    else {
        menu.order--;
        if(menu===donut||menu===dSet){
            donutRemain++;
        }
        else if(menu===waffle||menu===wSet){
            waffleRemain++;
        } 
    }
    calc();
}



//Room Calcurator
$('#room_calc input').click(function(){
    var room;
    switch ($(this).val()){
        case "ありす":
            room=r(100);
            $("#roomSelect").val("Alice");
            break;
        case "くま":
            room=r(0);
            $("#roomSelect").val("Bear");
            break;
        default:
            room=r(50);
            if(room==="ありす"){
                $("#roomSelect").val("Alice");
            }else{
                $("#roomSelect").val("Bear");
            }
            break;
    }
    $('#result').text(room);
    roomSelector();
});

function r(percent){
var i = Math.random()*100;
if(i < 10){
    i = i.toString()[0] ;
}else{
i = i.toString()[0] + i.toString()[1] ;
}
console.log(i);
if(i < percent){
    return "ありす"
}else{
    return "くま";
}
}