/**
 * Formats a file or folder name for display by:
 * - Removing the file extension
 * - Replacing dashes and underscores with spaces
 * - Capitalizing the first letter of each word
 * 
 * @param {string} name - The original file or folder name
 * @returns {string} - The formatted name
 */
export const formatName = (name) => {
  if (!name) return '';
  // Remove file extension for presentation
  const baseName = name.replace(/\.[^/.]+$/, "");
  
  // Replace dashes and underscores with space, and capitalize each word
  return baseName
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
