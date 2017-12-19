define(function (require) {
    var Backbone = require('Backbone');

    return Backbone.Model.extend({
        defaults: {
            userName: 'empty'
        }
    });
});