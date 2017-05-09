// Listen for form submit
document.getElementById('form').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName. siteUrl)) {
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Test if bookmark is Null
  if (localStorage.getItem('bookmarks') === null) {
    // Initialize array
    let bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmark));
  }

  // Clear form
  document.getElementById('form').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevet form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmark from LocalStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  let bookmarksResults = document.getElementById('bookmarksResults');
  // Build output
  bookmarksResults.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
    '<div class="well">' +
    '<h3>' + name +
    ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
    ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
    '</h3>' +
    '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (siteUrl.match(regex)) {
    alert('Plesa use a valid URL');
  }

  return true;
}
