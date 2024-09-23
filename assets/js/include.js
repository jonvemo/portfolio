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

    executeScripts();
  } catch (err) {
    error(err.message);
  }
};

// TEST 
const executeScripts = () => {
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.textContent = script.textContent;
    document.body.appendChild(newScript);
    document.body.removeChild(newScript); // Opcional: eliminar el script después de ejecutarlo
  });
};
