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
  } catch (err) {
    error(err.message);
  }
};
