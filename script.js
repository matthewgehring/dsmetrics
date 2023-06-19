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
  
    let summaryDiv = document.getElementById('videoSummary');
    summaryDiv.innerHTML = '';
  
    levels.forEach(level => {
      if (totalHours[level.toLowerCase()]) {
        let p = document.createElement('p');
        p.textContent = `${level} total hours: ${totalHours[level.toLowerCase()].toFixed(0)}`;
        summaryDiv.appendChild(p);
      }
    });
  
    let overallP = document.createElement('p');
    overallP.textContent = `Overall hours across all levels: ${overallHours.toFixed(0)}`;
    summaryDiv.appendChild(overallP);
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