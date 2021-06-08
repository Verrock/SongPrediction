import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import { ObjectStringifierHeader } from 'csv-writer/src/lib/record';

@Injectable()
export class ModelRepository {
  constructor() {}

  public writeFile(path: string, header: ObjectStringifierHeader, records: {[key: string]: any}[]) {
    const csvWriter = createObjectCsvWriter({path, header});

    csvWriter.writeRecords(records)
      .then(() => {
        console.log('Update user_top_tracks_features.csv successfully');
      });
  }
}
