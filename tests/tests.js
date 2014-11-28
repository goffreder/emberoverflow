// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
    setup: function() {
        // before each test, ensure the application is ready to run.
        delete localStorage.currentUser;
        Ember.run(App, App.advanceReadiness);
        // hides the ember testing container if needed
        if(window.location.search.indexOf("&nocontainer=true") !== -1)
            $("#ember-testing-container").css("visibility", "hidden");
    },

    teardown: function() {
        // reset the application state between each test
        App.reset();
        delete localStorage.currentUser;
    }
});

test("index page has a title and a list of questions", function() {
    visit("/");

    andThen(function() {
        equal(
            find("h2").text(),
            "Welcome to Emberoverflow",
            "Application header is rendered"
        );

        equal(
            find("ul:not(.nav) > li").length,
            2,
            "There are two questions in the list"
        );
    });
});

test("quesion links on index page lead to questions", function() {
    visit("/");
    click("ul:not(.nav) > li > a:first");

    andThen(function() {
        equal(
            find("h2").length,
            1,
            "Question header is rendered"
        );

        equal(
            find("p").length,
            2,
            "Question and author are rendered"
        );
    });
});

test("user will be able to log in", function() {
    visit("/sign-in");

    fillIn(".form-control", "tomster@hamster.com");
    click("button");

    andThen(function() {
        equal(
            find("p").text(),
            "You are already signed-in!",
            "Signed-in message rendered"
        );
    });
});
