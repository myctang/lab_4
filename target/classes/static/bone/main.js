
var PointModel = Backbone.Model.extend({
    url: function () {
        return this.urlRoot + '?x=' + this.x + '&y=' + this.y + '&r=' + this.r;
    },
    defaults: {
        x: 0,
        y: 0,
        r: 0
    }
});

var PointView = Backbone.View.extend({
    tagName: 'tr',
    el: '#pointsBody',

    initialize: function () {
        this.template = _.template($('#point-template').html());
        // this.listenTo(this.model, 'change', this.render());
    },

    render: function () {
        // alert('json');
        //alert(this.template(this.model.toJSON()));
        $('#pointsBody').append(this.template(this.model.toJSON()));
        return this;
    }
});

var PointCollection = Backbone.Collection.extend({
    model: PointModel
});

window.Points = new PointCollection;

var MainPageView = Backbone.View.extend({
    el: $('#start'),
    tagName: 'div',
    tagClass: 'pointsTable',
    template: _.template($('#pointTable-template').html()),

    initialize: function(){
        _.bindAll(this, 'addOne', 'addAll', 'render');
        Points.bind('add', this.addOne);
        Points.bind('refresh', this.addAll);
        // Points.bind('all', this.render);
    },

    render: function () {
        this.template = _.template($('#pointTable-template').html());
        $('#start').append(this.template());
    },

    addOne: function (point) {
        $("#pointsTable").show();
        var view = new PointView({model: point});
        //('point ' + point.toString());
        $("#pointsBody").append(view.render().el);
        var x = point.attributes.x;
        var y = point.attributes.y;
        var r = point.attributes.r;
        var color = "red";
        if (x <= 0 && y <= 0 && x >= -r / 2 && y >= -r)
            color = "green";
        if (x <= 0 && y >= 0 && y <= (2 * x + r))
            color = "green";
        if (x >= 0 && y >= 0 && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r / 2, 2))
            color = "green";
        $("#chart").append("<div class=\"dot\" style='left: " + (110 + x / r * 81) + "px; top: " + (110 - y / r * 81) + "px; background-color:" + color + "'></div>")
    },
    
    addAll: function () {
        // alert('addOne is ' + this.addOne);
        Points.each(this.addOne);
    }
});

var mainPage = new MainPageView;

var ApplicationController = Backbone.Router.extend({
    routes: {
        "": "start",
        "!/": "start",
        "!/login": "login",
        "!/register": "register",
        "!/points": "points"
    },

    start: function () {
        checkLogin();
        $(".template").remove();
        this.template = _.template($('#login-template').html());
        $('#start').append(this.template());
    },

    login: function () {
        checkLogin();
        $(".template").remove();
        this.template = _.template($('#login-template').html());
        $('#start').append(this.template());
    },

    register: function () {
        checkLogin();
        $(".template").remove();
        this.template = _.template($('#register-template').html());
        $('#start').append(this.template());
    },

    points: function () {
        var tokenCookie = $.cookie("lab4_access_token");
        if (!tokenCookie){
            $(location).attr("href", "#!/login");
            return;
        }
        $.ajax({
            url: "/api/points",
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer " + tokenCookie);
            },
            statusCode:{
                200: function (data) {
                    Points.reset();
                    $(".template").remove();
                    mainPage.render();
                    data.forEach(function (point) {
                        Points.add(point);
                    })
                }
            }
        });
    }
});

var Application = Backbone.View.extend({
    el: $('#start'),
    tagName: 'div',
    tagClass: 'login',

    initialize: function () {

    },

    render: function () {

    }
});

function checkLogin(){
    var tokenCookie = $.cookie("lab4_access_token");
    if (tokenCookie){
        $.ajax({
            url:"/api/checkLogin",
            method:"GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer " + tokenCookie);
            },
            statusCode:{
                200: function () {
                    $(location).attr("href", "#!/points");
                }
            }
        });
    }
}

$(document).ready(function () {
    var App = new Application();
    var controller = new ApplicationController();
    Backbone.history.start();
    Points.add({
        x: 1,
        y: 2,
        r: 3
    });
    Points.add({
        x: 2,
        y: 2,
        r: 2
    });
});
// window.App = new Application();