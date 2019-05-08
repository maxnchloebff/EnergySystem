function setCookie(name ,value ,iDay){
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+iDay)
    document.cookie=name+'='+value+'; expires='+oDate;
}
setCookie('username','KaiZhang',365);
setCookie('password','123456',365);
window.onload=function ()
{
    const obt = document.getElementById("button_add");
    obt.onclick=function (){
        document.getElementById("添加").style.display="block";
        obt.style.display="none";
    };
    const form = document.getElementById("form");
    const add = document.getElementById("add");
    add.onclick=function () {
        var oNew = document.createElement("th");
        oNew.className="form_tag";
        var oNewR = document.createElement("tr");
        oNew.innerHTML=document.getElementsByName("furniture_name")[0].value;
        oNewR.appendChild(oNew);
        for(var i = 0;i<5;i++){
            var oEle = document.createElement("td");
            oEle.className="form_value";
            if(i == 0)
                oEle.innerHTML = document.getElementById("type").value;
            oNewR.appendChild(oEle);
        }
        oNewR.className="form_content";
        form.appendChild(oNewR);
    };
    var oCancel = document.getElementById("cancel");
    oCancel.onclick=function(){
        document.getElementById("添加").style.display="none";
        obt.style.display="block";

    };
    const relative_link = document.getElementById("相关链接");
    const every_thing = document.getElementById("everything_except_links");
    function listener(){
        var link_height = relative_link.clientHeight;
        var body_height = every_thing.clientHeight;
        if(link_height!==body_height){
            resize();
        }
    }
    function resize(){
        relative_link.style.height=every_thing.clientHeight;
    }
    setInterval(listener,100);
};

