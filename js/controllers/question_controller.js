App.AskQuestionController = Ember.ArrayController.extend({
    needs : ['application'],
    sortProperties : ['date'],
    sortAscending : false,

    latestQuestions : function() {
        return this.slice(0,3);
    }.property('[]'),

    actions : {
        askQuestion : function() {
            var question = this.store.createRecord('question', {
                title : this.get('title'),
                question : this.get('question'),
                date : new Date()
            });

            this.get('controllers.application.signedInUser').then(function(user) {
                question.set('author', user);
            });

            var controller = this;

            question.save().then(function(question) {
                controller.setProperties({
                    title : '',
                    question : ''
                });

                controller.transitionToRoute('question', question);
            });
        }
    }
});
