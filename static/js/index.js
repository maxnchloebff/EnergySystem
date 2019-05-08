window.onload = function()
{
    const oButton_system = document.getElementById("access_to_system");
    const oButton_new_user = document.getElementById("register_new_user");
    oButton_system.onclick = function(){
        window.location.href ="/data";
    };
    oButton_new_user.onclick = function(){
        window.location.href ="/log_in";
    };


};

