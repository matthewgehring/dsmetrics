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


function toggleSummary() {
    var summary = document.getElementById("videoSummary");
    var toggleButton = document.getElementById("toggleButton");
    if (summary.style.display === "none") {
        summary.style.display = "block";
        toggleButton.classList.remove('fa-chevron-up');
        toggleButton.classList.add('fa-chevron-down');
    } else {
        summary.style.display = "none";
        toggleButton.classList.remove('fa-chevron-down');
        toggleButton.classList.add('fa-chevron-up');
    }
}


