// csv-util.service.ts
export class CsvUtilService {

    // Convert an array of objects to CSV
    public static convertToCsv(data: any[]): string {
      if (!data || data.length === 0) {
        return '';
      }
  
      // Get the headers from the first object
      const headers = Object.keys(data[0]);
  
      // Map the data to CSV rows
      const rows = data.map(item => 
        headers.map(header => item[header]).join(',')
      );
  
      // Join the headers with the rows to form the full CSV content
      return [headers.join(','), ...rows].join('\n');
    }
  
    // Trigger file download
    public static downloadCsv(content: string, filename: string): void {
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
  
      // Ensure the link is not null or undefined
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
  