// Random note picker for static site
(function() {
  window.goToRandomNote = function() {
    fetch('/index.json')
      .then(response => response.json())
      .then(notes => {
        if (notes.length > 0) {
          const randomIndex = Math.floor(Math.random() * notes.length);
          const randomNote = notes[randomIndex];
          window.location.href = randomNote.url;
        }
      })
      .catch(error => {
        console.error('Could not load notes index:', error);
      });
  };
})();
