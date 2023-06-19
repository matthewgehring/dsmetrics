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
    const levels = ["superbeginner", "beginner", "intermediate", "advanced"];
  
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
      if (totalHours[level]) {
        let p = document.createElement('p');
        p.textContent = `Level: ${level}, Total hours: ${totalHours[level].toFixed(2)}`;
        summaryDiv.appendChild(p);
      }
    });
  
    let overallP = document.createElement('p');
    overallP.textContent = `Overall hours across all levels: ${overallHours.toFixed(2)}`;
    summaryDiv.appendChild(overallP);
  }
  

function searchVideos() {
  let searchString = document.getElementById('searchInput').value;
  let results = data.videos.filter(video => video.title.toLowerCase().includes(searchString.toLowerCase()));
  displaySearchResults(results);
}

function displaySearchResults(results) {
  let resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = '';

  results.forEach(video => {
    let link = document.createElement('a');
    link.textContent = video.title;
    link.href = `https://www.dreamingspanish.com/watch?id=${video._id}`;
    resultsDiv.appendChild(link);

    let br = document.createElement('br');
    resultsDiv.appendChild(br);
  });
}
