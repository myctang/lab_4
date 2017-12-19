function tryLogin(){
    var login = $("#loginTextField").val();
    var password = $("#passwordTextField").val();
    $(".error").hide();
    $.ajax({
        url: "/oauth/token",
        method: "POST",
        data: {
            "grant_type":"password",
            "username":login,
            "password":password
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa("trusted-app:secret"));
        },
        statusCode:{
            400: function (xhr) {
                $(".error").show();
            },
            200: function (xhr) {
                var expires_time = new Date();
                expires_time.setTime(expires_time.getTime() + (parseInt(xhr["expires_in"]) * 1000));
                $.cookie("lab4_access_token", xhr["access_token"], {expires: expires_time});
                $(location).attr("href", "#!/points");
            }
        }
    });
}

function tryRegister() {
    $(".error").hide();
    var login = $("#loginTextFieldRegister").val();
    var password = $("#passwordTextFieldRegister").val();
    if (login === ""){
        $("#nullLogin").show();
        return;
    }
    if (password === ""){
        $("#nullPassword").show();
        return;
    }
    var User = {"username":login, "password":password};
    //alert(JSON.stringify(User));
    $.ajax({
        url: "/api/registerUser",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(User),
        statusCode:{
           201: function (xhr) {
                $(location).attr("href", "#!/login")
           },
           500: function () {
               $("#duplicate").show()
           }
        }
    })
}

function sendPoint(){
    $(".error").hide();
    var valid = true;
    var x = parseFloat($("#XPoint").val());
    var y = parseFloat($("#YPoint").val());
    var r = parseFloat($("#RPoint").val());
    if (isNaN(x) || x < -5 || x > 3){
        $("#XError").show();
        valid = false;
    }
    if (isNaN(y) || y < -5 || y > 5){
        $("#YError").show();
        valid = false;
    }
    if (isNaN(r) || r < 0 || r > 3){
        $("#RError").show();
        valid = false;
    }
    if (valid){
        var Point = {"x":x, "y":y, "r":r};
        $.ajax({
            url: "/api/addPoint",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(Point),
            statusCode:{
                200: function (point) {
                    Points.add(point);
                }
            }

        });
    }
}

function logout(){
    $.removeCookie('lab4_access_token');
    $(location).attr("href", "#!/login");
}

function sendPointFromImage(){
    var x = event.offsetX === undefined ? event.layerX : event.offsetX;
    x = x - 110;
    var y = event.offsetY === undefined ? event.layerY : event.offsetY;
    y = - (y - 110);
    var R = parseFloat($("#RPoint").val()).toFixed(4);
    if (isNaN(R) || R < 0 || R > 3){
        $("#RError").show();
    }else {
        $("#XPoint").val((x * R / 81).toFixed(4));
        $("#YPoint").val((y * R / 81).toFixed(4));
        $("#sendButton").click();
    }
}

function changeRadius(){
    var r = parseFloat($("#RPoint").val()).toFixed(4);
    if (!isNaN($("#RPoint").val()) && r > 0) {
        $(".dot").remove();
        $("#pointsTable tr").each(function () {
            var x = parseFloat($(this).find("td:nth-child(1)").html());
            var y = parseFloat($(this).find("td:nth-child(2)").html());
            if (!(isNaN(x) || isNaN(y)))
            var color = "red";
            if (x <= 0 && y <= 0 && x >= -r / 2 && y >= -r)
                color = "green";
            if (x <= 0 && y >= 0 && y <= (2 * x + r))
                color = "green";
            if (x >= 0 && y >= 0 && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r / 2, 2))
                color = "green";
            $("#chart").append("<div class=\"dot\" style='left: " + (110 + x / r * 81) + "px; top: " + (110 - y / r * 81) + "px; background-color:" + color + "'></div>")
        })
    }
}