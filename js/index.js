
const API_KEY = "AIzaSyD-xAyMePzHLDye8BP6CRnmRy3VBhIO64o";

function displayResults(jsonIn, term)
{
    let results = document.querySelector( '.results' );
    results.innerHTML = "";

    for( let i = 0; i < jsonIn.items.length; i ++){
        results.innerHTML += `
            <a href="https://www.youtube.com/watch?v=${jsonIn.items[i].id.videoId}" target="_blank">
              <div class="videoItem">
                  <img src="${jsonIn.items[i].snippet.thumbnails.medium.url}" />
                  <h3>
                      ${jsonIn.items[i].snippet.title}
                  </h3>
              </div>
            </a>
        `;
    }
  
}
const maxResults = 10;

function fetchVideos( term, pageToken )
{
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&maxResults=${maxResults}&type=video&order=relevance&q=${encodeURIComponent(term.trim())}`;
    if(pageToken != null) url += `&pageToken=${pageToken}`;
  
    let settings = {
        method : 'GET'
    };
    console.log(url);
    fetch( url, settings )
        .then( response => {
            if(response.ok)
            {
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults(responseJSON, term);
        })
        .catch( err => {
            console.log( err );
        });
}

function watchForm()
{
    let submitBtn = document.querySelector( '.submitButton' );
    let searchForm = document.querySelector( '.searchForm');

    submitBtn.addEventListener( 'click', (event) => {
        event.preventDefault();
        let searchTerm = document.querySelector( '#searchTerm' ).value;

        fetchVideos( searchTerm, null);
    });
  
    searchForm.addEventListener( 'submit', (event) => {
      event.preventDefault();
      let searchTerm = document.querySelector( '#searchTerm' ).value;

      fetchVideos( searchTerm, null);
    });
}

function init()
{
    watchForm();
}

init();