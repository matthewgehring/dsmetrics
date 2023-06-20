const revealButton = document.getElementById("revealButton");
const statsContainer = document.querySelector(".statsContainer");
const contentStatsArrow = document.querySelector("#downArrow");

revealButton.addEventListener('click', function() {
    if (statsContainer.style.display === "none") {
        statsContainer.style.display = "block"
    } // Display the image container
    else {
        statsContainer.style.display = "none"
    };
});


