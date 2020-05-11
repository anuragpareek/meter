import fs from 'fs';
import csv from 'csvtojson';
import path from 'path';
import { get, slice, orderBy as orderThem } from 'lodash';

const fileName = 'metering_data';
const indexs = {
  meterId: 0,
  wh: 2,
  varh: 3,
  timestamp: 4,
  date: 4,
};

export const load = async () => {
  const jsonArray = await csv().fromFile(`./public/${fileName}.csv`);

  // create a new timestamp from ReadingDateTimeUTC for a effective query
  const data = jsonArray.map((json)=>{
    let date = json.ReadingDateTimeUTC.split('/');
    date = `${date[1]}/${date[0]}/${date[2]}`;
    date = new Date(date);
    return [...Object.values(json), date.getTime()];
  });
  fs.writeFileSync(`./public/${fileName}.json`, JSON.stringify(data, null));
  return 'success';
};

export const fetch = async ({ meterId, startDate, endDate, order = 'desc', orderBy = 'timestamp', page = 0, limit = 10 } = {}) => {
  const rawdata = fs.readFileSync(path.join(__dirname, `../public/${fileName}.json`));
  let readingData = JSON.parse(rawdata);

  let meterFlag = true;
  let startDateFlag = true;
  let endDateFlag = true;

  if (meterId || startDate || endDate) {
    readingData = readingData.filter((reading)=>{
      if (meterId) {
        meterFlag = reading[indexs.meterId] === meterId;
      }

      if (startDate) {
        startDateFlag = reading[indexs.timestamp] >= (new Date(startDate)).getTime();
      }

      if (endDate) {
        endDateFlag = reading[indexs.timestamp] <= (new Date(endDate)).getTime();
      }

      return meterFlag && startDateFlag && endDateFlag;
    });
  }

  // Sort on basis of passed order by if orderBy is not a valid param then default sort is used
  const orderIndex = get(indexs, orderBy, indexs.timestamp);
  
  // Get Count before pagination so that we can get count of complete data after filters
  const count = readingData.length;
  
  readingData = orderThem(readingData, [orderIndex, indexs.timestamp], [order, 'desc'])
  
  if (page && limit) {
    const start = page * limit;
    const end = start + +limit
    readingData = slice(readingData, start, end);
  }

  return {data:readingData,count};
};
