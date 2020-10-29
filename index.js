'use strict';

// STARTED TRYING TO GET MY APP TO WORK WITH "NEWS SEARCH"
// METHOD, BUT I COULDN'T GET IT TO WORK
// define token for API authorization
    //const headers = {
    //    "Authorization" : `token c2ec92a314299935ea3c1c1d9fa8c838afed0f90`
    //};
// define url
    //const url = "https://api.github.com/users/derek-arrotta/repos";
    //const response = await fetch(url, {
    //    "method": "GET",
    //    "headers": headers
    //});
    //console.log(response);


// define parts of API url
let url1 = 'https://api.github.com/users/';
let url2 = '/repos';

// get repo list array/object
function getRepo(username) {
    let url = url1 + username + url2;
    return fetch(url)
        .then(response => response.json())
        .catch(error => alert('something went wrong'));
}

// take array/object response from above and append to results list
function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through array, stopping at the max number of results
    for (let i = 0; i < responseJson.length ; i++){
      // append repo list (url, name, description, and date)
      $('#results-list').append(
        `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
        <p>${responseJson[i].description}</p>
        <p>By ${responseJson[i].updated_at}</p>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };

  // display repo list
  function watchForm() {
    $('form').submit(event => {
        // prevent default action of form submit (prevent from submitting form and just perform action below)
        event.preventDefault();
        // define username from form input
        const username = $('#js-search-term').val();
        // get repo list and display
        getRepo(username)
            .then(response => {
                displayResults(response);
        });
    });
}

// run functions
$(function() {
    // when web page first loads, the function runs and this message runs
    console.log('App loaded! Waiting for submit!');
    // watch form will not run until submit is pressed. once watch form runs, all previous functions are triggered
    watchForm();
});













