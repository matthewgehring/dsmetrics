let data;

fetch('/.netlify/functions/getvideos')
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
  
    let table = document.createElement('table');
    summaryDiv.appendChild(table);
  
    levels.forEach(level => {
      if (totalHours[level.toLowerCase()]) {
        let row = document.createElement('tr');
        table.appendChild(row);
  
        let levelCell = document.createElement('td');
        levelCell.textContent = level;
        row.appendChild(levelCell);
  
        let hoursCell = document.createElement('td');
        hoursCell.textContent = totalHours[level.toLowerCase()].toFixed(0);
        row.appendChild(hoursCell);
      }
    });
  
    let totalRow = document.createElement('tr');
    table.appendChild(totalRow);
  
    let totalCell = document.createElement('td');
    totalCell.textContent = 'Total';
    totalRow.appendChild(totalCell);
  
    let totalHoursCell = document.createElement('td');
    totalHoursCell.textContent = overallHours.toFixed(0);
    totalRow.appendChild(totalHoursCell);
  }
  
  

  function searchVideos() {
    let searchString = document.getElementById('searchInput').value;
    let results = data.videos.filter(video => video.title.toLowerCase().includes(searchString.toLowerCase()));
    
    // Calcula el tiempo total de los videos devueltos por la búsqueda
    let totalTime = 0;
    results.forEach(video => {
      totalTime += video.duration;
    });
    totalTime = Math.round(totalTime / 60); // Convierte a minutos
    
    // Muestra el tiempo total en una nueva caja
    let totalTimeBox = document.getElementById('totalTimeBox');
    if (!totalTimeBox) {
      totalTimeBox = document.createElement('div');
      totalTimeBox.id = 'totalTimeBox';
      document.body.insertBefore(totalTimeBox, document.getElementById('searchResults'));
    }
    totalTimeBox.innerHTML = `Total time: ${totalTime} min`;
    
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
  let ul = document.createElement('ul');

  sortedResults.forEach(result => {
    if (result.level !== currentLevel) {
      // New level, add a heading
      let h3 = document.createElement('h3');
      h3.className = result.level;
      const capitalized = result.level.charAt(0).toUpperCase() + result.level.slice(1);
      h3.textContent = `${capitalized}`;
      searchResultsDiv.appendChild(h3);
      ul = document.createElement('ul');
      searchResultsDiv.appendChild(ul);
      currentLevel = result.level;
    }

    // Add the video link
    let a = document.createElement('a');
    a.href = `https://www.dreamingspanish.com/watch?id=${result._id}`;
    a.target="_blank";
    a.rel="noopener noreferrer";
    
    let videoInfo = document.createElement('div');
    videoInfo.className = 'video-info';

    let titleText = document.createElement('span');
    titleText.className = 'video-title'; // Add a class to style the title
    titleText.textContent = `${result.title}`; // No need to shorten the title here
    videoInfo.appendChild(titleText); // Append the title after the button
    if (result.title.length >= 50) {
      titleText.classList.add('overflowing');
    }
    
    if (result.private) {
      let privateBadge = document.createElement('span');
      privateBadge.className = 'private-badge';
      privateBadge.textContent = "⭐";
      videoInfo.prepend(privateBadge);
      a.classList.add("private-video");
    }
    
    let duration = document.createElement('div');
    duration.className = 'duration';
    duration.textContent = `${Math.round(result.duration / 60)} min`;
    
    videoInfo.appendChild(duration);
    a.appendChild(videoInfo);
    
    let li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  });
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    searchVideos();
  }
}

