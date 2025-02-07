// Posts laden, sobald die Seite geladen wird
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:5000/posts')
    .then(response => response.json())
    .then(posts => {
      const postsContainer = document.getElementById('postsContainer');

      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.textContent = post.content;  // Zeigt den Post-Inhalt an

        postsContainer.prepend(postElement);  // Fügt den Post oben im Feed hinzu
      });
    })
    .catch(error => console.error('Fehler beim Laden der Posts:', error));
});

// Neues Post hinzufügen
document.getElementById('postBtn').addEventListener('click', function() {
  const postInput = document.getElementById('postInput');
  const postContent = postInput.value.trim();

  if (postContent) {
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: postContent })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);

      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.textContent = data.content;

      document.getElementById('postsContainer').prepend(postElement);
      postInput.value = '';  // Eingabefeld leeren
    })
    .catch(error => console.error('Fehler beim Senden des Posts:', error));
  } else {
    alert('Bitte etwas eingeben, bevor du postest!');
  }
});
