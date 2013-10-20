$(function () {
    var AppState = Backbone.Model.extend({
        defaults: {
            username: "",
            state: "start"
        }

    });

    var UserNameModel = Backbone.Model.extend({
        defaults: {
            "Name": ""
        }
    });

    var Family = Backbone.Collection.extend({
        model: UserNameModel,

        checkUser: function (username) {
            var findResult = this.find(function (user) {
                return user.get("Name").toLowerCase() == username.toLowerCase()
            });
            return findResult != null;
        }
    });

    var MyFamily = new Family([
                { Name: "Aleksey" },
                { Name: "Test" }
            ]);

    var Block = Backbone.View.extend({
        el: $("#block"),

        templates: {
            "start": _.template($('#start').html()),
            "success": _.template($('#success').html()),
            "error": _.template($('#error').html())
        },

        initialize: function () {
            this.model.bind('change', this.render, this);
        },

        render: function () {
            var state = this.model.get("state");
            $(this.el).html(this.templates[state](this.model.toJSON()));
            return this;
        },

        events: {
            "click input:button": "check"
        },

        check: function () {
            var username = this.el.find("input:text").val();
            var find = MyFamily.checkUser(username);
            appState.set({
                "state": find ? "success" : "error",
                "username": username
            });
        },
    });

    var Controller = Backbone.Router.extend({
        routes: {
            "": "start",
            "!/": "start",
            "!/success": "success",
            "!/error": "error"
        },

        start: function () {
            appState.set({ state: "start" });
        },

        success: function () {
            appState.set({ state: "success" });
        },

        error: function () {
            appState.set({ state: "error" });
        }
    });

    var appState = new AppState();

    var controller = new Controller();
    var block = new Block({ model: appState });
    appState.trigger("change");

    appState.bind("change:state", function () {
        var state = this.get("state");
        if (state == "start")
            controller.navigate("!/", false);
        else
            controller.navigate("!/" + state, false);
    });
    Backbone.history.start();
});