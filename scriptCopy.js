let data;

fetch('videos.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    calculateAndDisplayVideoSummary();
  });

function calculateAndDisplayVideoSummary() {
  let totalHours = {};
  let overallHours = 0;
  const levels = ["Superbeginner", "Beginner", "Intermediate", "Advanced"];

  data.videos.forEach(video => {
    const level = video.level;
    const durationInHours = video.duration / 3600;

    if (!totalHours[level]) {
      totalHours[level] = 0;
    }

    totalHours[level] += durationInHours;
    overallHours += durationInHours;
  });

  let summaryDiv1 = document.getElementById('column-1');
  summaryDiv1.innerHTML = '';
  let summaryDiv2 = document.getElementById('column-2');
  summaryDiv2.innerHTML = '';

  levels.forEach(level => {
    if (totalHours[level.toLowerCase()]) {
      let p = document.createElement('p');
      p.textContent = `${level} total hours:`;
      summaryDiv1.appendChild(p);
    }
  });

  levels.forEach(level => {
    if (totalHours[level.toLowerCase()]) {
      let p = document.createElement('p');
      p.textContent = `${totalHours[level.toLowerCase()].toFixed(0)}`;
      summaryDiv2.appendChild(p);
    }
  });

  let summaryDiv = document.getElementById('summary'); // Corrected line

  let overallP1 = document.createElement('p');
  overallP1.textContent = `Overall hours across all levels:`;
  summaryDiv.appendChild(overallP1);

  let overallP2 = document.createElement('p');
  overallP2.textContent = `${overallHours.toFixed(0)}`;
  summaryDiv.appendChild(overallP2);
}


function searchVideos() {
  let searchString = document.getElementById('searchInput').value;
  let results = data.videos.filter(video => video.title.toLowerCase().includes(searchString.toLowerCase()));
  displaySearchResults(results);
}

function displaySearchResults(results) {
  let searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = '';

  // Sort results by level
  let sortedResults = results.sort((a, b) => {
    const levels = ["superbeginner", "beginner", "intermediate", "advanced"];
    return levels.indexOf(a.level) - levels.indexOf(b.level);
  });

  let currentLevel = null;

  sortedResults.forEach(result => {
    if (result.level !== currentLevel) {
      // New level, add a heading
      let h3 = document.createElement('h3');
      const capitalized = result.level.charAt(0).toUpperCase() + result.level.slice(1);
      h3.textContent = `${capitalized}`;
      searchResultsDiv.appendChild(h3);
      currentLevel = result.level;
    }

    // Add the video link
    let a = document.createElement('a');
    a.href = `https://www.dreamingspanish.com/watch?id=${result._id}`;
    a.textContent = `${result.title} - Duration: ${Math.round(result.duration / 60)} minutes`;
    searchResultsDiv.appendChild(a);
  });
}