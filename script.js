let apiQuotes = [];

//  Show new quotes
const newQuote = () => {
  // Pick a ramdom quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
};

// Get quotes from API
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
};

// on load
getQuotes();
