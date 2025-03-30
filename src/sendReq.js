export function sendPromptAndFilesToBackend(prompt, sourceDir, outputDir, workingMode) {
    return fetch('/api/getAIResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            workingMode: workingMode,
            prompt: prompt,
            sourceDir: sourceDir,
            outputDir: outputDir
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}