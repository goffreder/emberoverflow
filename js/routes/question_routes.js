App.AskQuestionRoute = Ember.Route.extend({
    model : function() {
        return this.store.findAll('question');
    }
});

App.QuestionsRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('question');
    }
});

App.QuestionRoute = Ember.Route.extend({
    actions : {
        didTransition : function() {
            this.controller.set('isEditing', false);
            return true;
        }
    }
});
