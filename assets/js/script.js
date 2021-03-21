$(document).ready(function () {

    $("#location-background").attr("onclick", "showCoords(event)")

    // add style
    $(".option-button").addClass("btn btn-option")
    $(".player-options > .col-4").addClass("center-text").text("naaah")

    showCoords = (event) => {
        var x = event.pageX;
        var y = event.pageY;
        var xx = event.offsetX;
        var yy = event.offsetY;
        var coords = "X coords: " + x + ", Y coords: " + y;
        var coords2 = "X coords: " + xx + ", Y coords: " + yy;
        console.log(coords)
        console.log(coords2)
        // document.getElementById("demo").innerHTML = coords;
    }

    
})