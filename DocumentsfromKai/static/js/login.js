        window.onload=function(){
        //设置cookie
        var users = users;
        var password = password;
        function setCookie(name ,value,iDay){
            var oDate=new Date();
            oDate.setDate(oDate.getDate()+iDay);
            document.cookie=name+'='+value+' ;expires='+oDate;
        }
        //判断cookie中是否有相对应的用户名和密码，有，返回true
        function getCookie(name,password){
            var arr=document.cookie.split('; ');
            for(var i =0;i<arr.length;i++){
                var arr2 = arr[i].split('=');
                if(arr2[0]==name&&arr2[1]==password){
                    return true;
                }
            }
            return false;
        }
        const oUser = document.getElementsByName("username")[0];
        const oPass = document.getElementsByName("password")[0];
        const oSubmit = document.getElementById("submit");
        const oRegister = document.getElementById("register");
        const oRegisterForm = document.getElementById("register_form");
        const oRegisterSubmit = document.getElementById("register_submit");
        const oRegisterCancel = document.getElementById("register_cancel");
        //登录的判断
        oSubmit.onclick=function(){
            index = 0;
            for (index=0;index<users.length;index++){
                if(oUser.value==users[index] && oPass.value==password[index])
                {
                    window.location.href ="/data";
                    window.alert("Login Success!!!");
                    break;
                }
            }
            if(index==users.length){
                window.alert("Your ID or Password is wrong!!!");
                window.location.href ="/log_in";
            }
        };
        //注册时候隐藏登录窗口，显示注册窗口
        oRegister.onclick=function(){
            oRegisterForm.style.display="block";
            document.getElementById("username").style.display="none";
            document.getElementById("password").style.display="none";
            document.getElementById("id_submit").style.display="none";
        };
        //实现取消注册是的显示和隐藏
        function register_cancel() {
            oRegisterForm.style.display="none";
            document.getElementById("username").style.display="block";
            document.getElementById("password").style.display="block";
            document.getElementById("id_submit").style.display="block";
        }
        oRegisterCancel.onclick=function(){
            register_cancel()
        };
        //提交注册的数据到cookie
        oRegisterSubmit.onclick=function () {
            newname = document.getElementsByName("username")[1].value;
            newpassword = document.getElementsByName("password")[1].value;
            setCookie(newname,newpassword,30);
            oRegisterForm.style.display="none";
            register_cancel();
            alert(document.cookie.valueOf());
        }
    } ;