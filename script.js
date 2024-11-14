document.getElementById("textInput").addEventListener("input", function() {
    updateCounts();
    toggleCopyButton();  // Show or hide the copy button based on text
});

document.getElementById("clearButton").addEventListener("click", function() {
    document.getElementById("textInput").value = "";  // Clear the textarea
    updateCounts();  // Reset all counters
    toggleCopyButton();  // Hide the copy button
});

function updateCounts() {
    const text = document.getElementById("textInput").value.trim();

    // Character count
    const charCount = text.length;

    // Word count
    const words = text.split(/\s+/).filter(word => word);
    const wordCount = words.length;

    // Sentence count (splitting on ".", "!", or "?")
    const sentenceCount = text ? text.split(/[.!?]+\s*/).filter(sentence => sentence).length : 0;

    // Paragraph count (splitting on line breaks)
    const paragraphCount = text ? text.split(/\n+/).filter(paragraph => paragraph.trim()).length : 0;

    // Reading time (assuming 275 words per minute)
    const readingTimeMinutes = Math.floor(wordCount / 275);
    const readingTimeSeconds = Math.ceil((wordCount % 275) / (275 / 60));

    // Speaking time (assuming 180 words per minute)
    const speakingTimeMinutes = Math.floor(wordCount / 180);
    const speakingTimeSeconds = Math.ceil((wordCount % 180) / (180 / 60));

    // Grade Reading Level (Flesch-Kincaid)
    function countSyllables(word) {
        return word.toLowerCase().match(/[aeiouy]+/g)?.length || 0;
    }
    
    const totalSyllables = words.reduce((total, word) => total + countSyllables(word), 0);
    const gradeReadingLevel = sentenceCount > 0 && wordCount > 0
        ? (0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59).toFixed(1)
        : 0;

    // Display formatted reading and speaking times
    const formattedReadingTime = `${readingTimeMinutes} min ${readingTimeSeconds} sec`;
    const formattedSpeakingTime = `${speakingTimeMinutes} min ${speakingTimeSeconds} sec`;

    // Update counts in the UI
    document.getElementById("wordCount").textContent = wordCount;
    document.getElementById("charCount").textContent = charCount;
    document.getElementById("sentenceCount").textContent = sentenceCount;
    document.getElementById("paragraphCount").textContent = paragraphCount;
    document.getElementById("readingTime").textContent = formattedReadingTime;
    document.getElementById("speakingTime").textContent = formattedSpeakingTime;
    document.getElementById("gradeLevel").textContent = gradeReadingLevel;
}

// Function to show or hide the copy button based on textarea content
function toggleCopyButton() {
    const text = document.getElementById("textInput").value.trim();
    const copyButton = document.getElementById("copyButton");
    
    if (text.length > 0) {
        copyButton.classList.remove("hidden");
    } else {
        copyButton.classList.add("hidden");
    }
}

// Function to copy text to clipboard
function copyText() {
    const text = document.getElementById("textInput").value;
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("The text has been copied from the clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
}