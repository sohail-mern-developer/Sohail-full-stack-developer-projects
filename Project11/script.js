// Get DOM Elements
const filter = document.getElementById('filter');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

// Globle variables for number of posts to fetch 
let limit = 5;
let page = 1;

//function to fetch post to api
async function fetchPosts() {
    // fetch the post from jsonplaceholder api
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
};

// Function to render the post fetched from API
async function rendorPosts() {
    // Fetch the data from API that we want to render
    const posts = await fetchPosts();
    // console.log(posts);
    // foreachobject in the post array, render the posts
    posts.forEach(post => {
        // create the div
        const postDiv = document.createElement('div');
        // Assign the post class to the div
        postDiv.classList.add('post');
        // Create the inner content for the main post div
        postDiv.innerHTML = `
        <div class="post-id">${post.id}</div>
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        </div>
        `;
        // Render the postDiv in the DOM
        newsFeed.appendChild(postDiv);
    });
};

// Function to show the css loader animation
function showLoader() {
    // Display the css loader animation
    loader.classList.add('show');
    // Increament the page global variable by 1
    page++;
    rendorPosts();
    //remove the loader show class
    loader.classList.remove('loader');
};

// Function to filter the posts
function filterPosts(e) {
    // save the input as the filter keyword
    const filterKeyword = e.target.value.toLowerCase();
    // Get the all data from Posts
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        // Get the title text
        const title = post.querySelector('.post-title').innerText;
        // Get the body
        const body = post.querySelector('.post-body').innerText;
        // Check if filterkeyword exist in the title or body
        if( title.indexOf(filterKeyword) >= 0 || body.indexOf(filterKeyword) >= 0 ) {
            // Display the post if the filterkeyword exist in the title or body
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
};


// Event Listners
// 1 - Listen for scroll in the browser window
window.addEventListener('scroll', () => {
    // Destructuring properties from DOM
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if( scrollTop + clientHeight > scrollHeight - 10 ) {
        // Show the loader animation
        showLoader();
    }
});

// 2 - Listen for input in the filter input
filter.addEventListener('input', filterPosts);

rendorPosts();

