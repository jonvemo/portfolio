export const getHTML = async (url, options) => {
  const { success, error } = options;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    success(html);

    loadExternalScripts();
  } catch (err) {
    error(err.message);
  }
};

// TEST 
const loadExternalScripts = () => {
  const scripts = document.querySelectorAll('script[src]');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.src = script.src;
    newScript.async = false; // Mantener el orden de ejecución
    document.body.appendChild(newScript);
  });
};
