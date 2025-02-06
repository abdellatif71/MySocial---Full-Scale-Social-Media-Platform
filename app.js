document.getElementById('postBtn').addEventListener('click', function() {
    const postInput = document.getElementById('postInput');
    const postContent = postInput.value.trim();
  
    if (postContent) {
      const post = document.createElement('div');
      post.className = 'post';
      post.textContent = postContent;
  
      document.getElementById('postsContainer').prepend(post);
      postInput.value = '';
    } else {
      alert('Please write something before posting!');
    }
  });