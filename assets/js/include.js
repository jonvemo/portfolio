export const getHTML = async (url, options) => {
  const { success, error } = options;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    success(html);

  } catch (err) {
    error(err.message);
  }
};

