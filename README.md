# Quote Generator

A small browser app built with HTML, CSS, and vanilla JavaScript. It displays a random quote and its author, lets you select another quote, and opens an X composer to share it.

## Run locally

1. Download or clone the project.
2. Open `index.html` in a modern browser, or serve the folder with your editor's local server (such as VS Code Live Server).
3. Wait for a quote, then click **New Quote** to select another. Click the **X icon** to open a prefilled post in a new tab.

No build step, package installation, or API key is required. An internet connection is needed to fetch quotes and load the external font and icons. Publishing on X requires signing in there.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Quote card, author, buttons, spinner, and stylesheet/script links. |
| `style.css` | Font, SVG background, card layout, button states, spinner animation, and responsive styles. |
| `script.js` | Fetching, cached quote selection, DOM updates, loading states, and sharing. |
| `logo.png` | Logo used as the browser-tab icon (favicon), linked in `index.html`. |

## How it works

1. The script looks up elements by their HTML IDs and registers button click handlers.
2. `getQuotes()` calls `loading()` to show the spinner and hide the card, then fetches `https://dummyjson.com/quotes`.
3. The response's `quotes` array is saved in `apiQuotes`. Each item is expected to contain `quote` and `author` properties.
4. `newQuote()` randomly selects an item, fills the quote and author using `textContent`, and substitutes `Unknown` for a missing author.
5. Quotes longer than 50 characters receive the `long-quote` class for smaller text. `complete()` reveals the card and hides the spinner.
6. **New Quote** reuses the saved batch; it does not fetch more quotes. Random selections may repeat.
7. `tweetQuote()` opens X's intent URL with the displayed quote and author. It does not publish automatically.

The script is placed at the end of the HTML body so the elements exist before it runs. Keep IDs in the HTML and JavaScript in sync when renaming elements.

## Customize

- **Appearance:** Edit the colors, background, spacing, and `.quote-container` rules in `style.css`.
- **Quote sizing:** Change the 50-character threshold in `newQuote()` and the `.long-quote` font size together.
- **Mobile layout:** Adjust the `max-width: 1000px` media query.
- **Quote source:** Change `apiUrl` in `getQuotes()` and adapt the response mapping if the new service uses different fields. The browser must be allowed to fetch that service across origins.
- **Icons and font:** Font Awesome is linked in `index.html`; Montserrat is imported from Google Fonts in `style.css`.
