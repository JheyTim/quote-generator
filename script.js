// Cache the HTML elements once. These IDs must match index.html.
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Keep the fetched objects ({ quote, author, ... }) in memory for later selections.
let apiQuotes = [];

// Replace the quote card with the spinner using the native HTML hidden property.
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Reveal the updated card and hide the spinner after rendering.
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Render a cached quote. This function requires a nonempty apiQuotes array.
function newQuote() {
  showLoadingSpinner();

  // Turn a random number into an array index, then extract quote and author.
  // Independent selections mean the same quote can appear consecutively.
  const { quote, author } =
    apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Provide a fallback for an empty, null, or otherwise falsy author.
  if (!author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = author;
  }

  // Quotes over 50 characters use the smaller font defined in style.css.
  // Remove the class for short quotes to clear the previous selection's styling.
  if (quote.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Insert plain text rather than HTML, then show the completed card.
  quoteText.textContent = quote;
  removeLoadingSpinner();
}

// Fetch the initial batch asynchronously while the spinner is displayed.
async function getQuotes() {
  showLoadingSpinner();

  const apiUrl = 'https://dummyjson.com/quotes';

  try {
    // Parse the response JSON; its quotes property contains the quote objects.
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Cache this batch so New Quote does not need another network request.
    apiQuotes = data.quotes;
    newQuote();
  } catch (error) {
    console.error(error);
    // No error UI or retry yet: a failed request or parse leaves the spinner visible.
  }
}

// Open the X composer; the user still chooses whether to publish the post.
// Text is currently interpolated directly, without encoding URL special characters.
function tweetQuote() {
  const twitterUrl = `https://x.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Pass function references so handlers run on clicks, not during registration.
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Start the initial fetch immediately when this script runs.
getQuotes();
