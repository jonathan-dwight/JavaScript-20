const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
const removeLoadingSpinner = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
const getQuote = async () => {
    showLoadingSpinner();
    const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
    const apiUrl =
        "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        removeLoadingSpinner();
    } catch (error) {
        // we can cover the recursive errors by having a counter if somethign is wrong
        getQuote();
    }
}

// Tweet Quote
const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();


//PROBLEM WITH THIS CODE IS THE PROXYURL

// const proxyUrl = "http://api.allorigins.win/get?url=";
    // const apiUrl =
    //     "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    // try {
    //     const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    //     const data = await response.json();
    //     const quoteObj = JSON.parse(data.contents);

    //     // if author is blank, add "unknown"
    //     console.log(data);
    //     if (quoteObj.quoteAuthor === "") {
    //         authorText.innerText = "Unknown"
    //     } else {
    //         authorText.innerText = quoteObj.quoteAuthor;
    //     }

    //     // reduce fontsize
    //     if (quoteObj.quoteText.length > 120) {
    //         quoteText.classList.add('long-quote');
    //     } else {
    //         quoteText.classList.remove('long-quote');
    //     }
        
    //     quoteText.innerText = quoteObj.quoteText;

    // } catch (error) {
    //     getQuote();
    // }