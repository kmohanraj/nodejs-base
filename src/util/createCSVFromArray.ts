import { writeToString } from 'fast-csv';
import { IBulkUploadHeaders, IResultData } from '../model/bulkUploadInterfaces';

export default async (row: IResultData[] | IBulkUploadHeaders[]) => {
  return await writeToString(row, { headers: true });
};
