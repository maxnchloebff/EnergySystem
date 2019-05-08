    window.onload=function(){
        var names= Server.names ;
        let oUsers = document.getElementById("users");
        var oButton_edit = document.getElementById("edit");
        var oButton_add = document.getElementById("add_new");
        var oButton_delete = document.getElementById("delete");
        var oEdit = document.getElementById("edit_part");
        var oDelete_form = document.getElementById("delete_form");
        var oAdd_form = document.getElementById("add_form");
        var oButton_confirm_delete = document.getElementById("confirm_delete");
        var oButton_confirm_add = document.getElementById("confirm_add");
        function append_users(){
            let user_name = [];
            let arr = document.cookie.split('; ');
            for(var i = 0; i<arr.length; i++) {
                let arr2 = arr[i].split('=');
                user_name[i]=arr2[0];
            }
            for(var j =0; j<name.length; j++){
                let new_li = document.createElement("li");
                new_li.innerText = name[j];
                oUsers.appendChild(new_li);
            }
        }


        function edit_user(){
            oEdit.style.display="block";
            oButton_edit.style.display="none";
        }
        function block_delete_form(){
            oEdit.style.display = "none";
            oDelete_form.style.display = "block";
        }
        function block_add_form(){
            oEdit.style.display = "none";
            oAdd_form.style.display = "block";
        }
        function confirm_delete(){
            oButton_edit.style.display = "block";
            oDelete_form.style.display = "none";
        }
        function confirm_add(){
            oButton_edit.style.display = "block";
            oAdd_form.style.display = "none";
        }
        oButton_edit.addEventListener('click', edit_user);
        oButton_delete.addEventListener('click',block_delete_form);
        oButton_add.addEventListener("click",block_add_form);
        oButton_confirm_add.addEventListener("click",confirm_add);
        oButton_confirm_delete.addEventListener("click",confirm_delete);
    };