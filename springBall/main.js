/*游戏启动项*/
import Game from './combine/GameInit';

window.onload=function(){
    var d = new Date();
    var years = d.getFullYear();
    var month = add_zero(d.getMonth()+1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds=add_zero(d.getSeconds());
    var now = years+"-"+month+"-"+days+" "+hours+":"+minutes+":"+seconds;
    var begainTime='2017-02-01 00:00:00';
    var endTime='2017-02-10 23:59:59';
    if(CompareDate(begainTime,now) || CompareDate(now,endTime)){
        alert('活动未开始');
    }else{
        new Game();
    }
    function add_zero(temp){
        if(temp<10) return "0"+temp;
        else return temp;
    }
    function CompareDate(d1,d2){
        return ((new Date(d1.replace(/-/g,"/"))) > (new Date(d2.replace(/-/g,"/"))));
    }
}