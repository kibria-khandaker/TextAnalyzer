document.getElementById("textInput").addEventListener("input", function() {
    updateCounts();
});

document.getElementById("clearButton").addEventListener("click", function() {
    document.getElementById("textInput").value = "";  // Clear the textarea
    updateCounts();  // Reset all counters
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
