
// Reusable game object, call reset() to start new game.
var game = {
    winsCount: 0,
    lossCount: 0,

    goalValue: 0,
    currentValue: 0,
    crystalValues: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
    },

    isWin: false,
    isLoss: false,

    // Resets game with initial values (randomly generated goal and each crystal values).
    reset: function(){
        var me = this;
        me.goalValue = getRandomValue(19, 120);
        me.currentValue = 0;
        me.crystalValues.one = getRandomValue(1, 12);
        me.crystalValues.two = getRandomValue(1, 12);
        me.crystalValues.three = getRandomValue(1, 12);
        me.crystalValues.four = getRandomValue(1, 12);
        me.isWin = false;
        me.isLoss = false;

        me.update();
    },
    // Calculates current score based on selected crystal.
    selectCrystal: function(crystalNumber){
        var me = this;

        if (me.isWin || me.isLoss) {
            return;
        }

        var crystalValue = me.crystalValues[crystalNumber];
        me.currentValue += crystalValue;

        if (me.currentValue === me.goalValue){
            me.isWin = true;
            me.winsCount++;
        }
        else if (me.currentValue >= me.goalValue){
            me.isLoss = true;
            me.lossCount++;
        }

        me.update();
    },
    // Updates visual elements.
    update: function(){
        var me = this;

        $("#goalValue").text(me.goalValue);
        $("#currentValue").text(me.currentValue);

        $("#stats").html(me.winsCount + "&nbsp; / &nbsp;" + me.lossCount);
        $("#stats").css("background-color", "white");
        if (me.isWin) {
            debugger;
            $("#stats").css("background-color", "lightgreen");
        }
        if (me.isLoss) {
            debugger;
            $("#stats").css("background-color", "pink");
        }
    }
};

// Utility: generates random number in range.
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// Ready function
$(document).ready(function() {
    // Start new game
    game.reset();

    // Attach click handler for crystal elements
    $(".crystal").click(function() {
        var crystalNumber = $(this).attr("data-crystal-number");

        game.selectCrystal(crystalNumber);
    });
    // Attach click hander to reset buttom
    $("#reset").click(function() {
        game.reset();
    });
});
