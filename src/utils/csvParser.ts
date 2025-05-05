// CSV parsing utility

/**
 * Parses a CSV string into an array of objects
 * @param csvText The raw CSV text
 * @returns Array of objects with keys from the header row
 */
export function parseCSV(csvText: string): Record<string, string>[] {
  // Split by newlines
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    return [];
  }
  
  // First line is headers
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Parse data rows
  return lines.slice(1).map(line => {
    const values = line.split(',').map(val => val.trim());
    const record: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    return record;
  });
}

/**
 * Groups array items by a specified key
 * @param array Array of objects
 * @param key The key to group by
 * @returns Object with key-value pairs where values are arrays
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, item) => {
    const groupKey = String(item[key]);
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {});
}