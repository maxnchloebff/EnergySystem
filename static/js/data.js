
window.onload=function ()
{
    const obt = document.getElementById("button_add");
    const delete_button = document.getElementById("button_delete");
    obt.onclick=function (){
        document.getElementById("添加").style.display="block";
        obt.style.display="none";
        delete_button.style.display="none";
    };
    delete_button.onclick=function (){
        document.getElementById("删除").style.display="block";
        delete_button.style.display="none";
        obt.style.display="none";
    };
    const form = document.getElementById("form");
    const add = document.getElementById("add");
    const delete_confirm = document.getElementById("delete");

    add.onclick=function () {
        const elec_name =document.getElementsByName("furniture_name")[0].value;
        const elec_type = document.getElementById("type").value;
        window.location.href = "/addelectronics/"+elec_name+"/"+elec_type;
    };
    delete_confirm.onclick=function () {
        const elec_name =document.getElementsByName("furniture_name")[1].value;
        const elec_type = document.getElementById("type_delete").value;
        window.location.href = "/deleteelectronics/"+elec_name+"/"+elec_type;
    };
    var oCancel = document.getElementById("cancel");
    var oCancel_delete = document.getElementById("cancel_delete");
    oCancel.onclick=function(){
        document.getElementById("添加").style.display="none";
        obt.style.display="block";
        delete_button.style.display="block";

    };
    oCancel_delete.onclick=function(){
        document.getElementById("删除").style.display="none";
        delete_button.style.display="block";
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

