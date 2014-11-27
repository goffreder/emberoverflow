App.SignInController = Ember.Controller.extend({
    needs : [ 'application' ],

    actions : {
        signIn : function() {
            var email = this.get("email");
            userToLogin = App.User.FIXTURES.findBy("email", email);

            if(userToLogin === void 0) {
                alert("Wrong email!");
                this.set("email", "");
            }
            else {
                localStorage.currentUser = userToLogin.id;
            }
        }
    }
});
