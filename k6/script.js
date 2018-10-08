//k6 config file

import http from 'k6/http';
import { sleep, check } from 'k6';
import faker from 'faker';

export let options = {
  stages: [
    {
      vus: 10,
      rps: 10,
      duration: '15s'
    },
    {
      vus: 100,
      rps: 10,
      duration: '15s'
    },
    {
      vus: 100,
      rps: 100,
      duration: '15s'
    },
    {
      vus: 100,
      rps: 500,
      duration: '15s'
    },
    {
      vus: 500,
      rps: 500,
      duration: '15s'
    },
    {
      vus: 1000,
      rps: 500,
      duration: '15s'
    },
    {
      vus: 1000,
      rps: 1000,
      duration: '15s'
    }
  ]
};

export default function() {
  var id = Math.ceil(Math.random() * 10000000 + 10000001);
  let res = http.get(`http://localhost:3001/api/v1/artists/${id}\albums`);
  check(res, {
    'status was 200': r => r.status == 200,
    'server under load threshold': r => r.status !== 503,
    'transaction time OK': r => r.timings.duration < 1000
  });
  sleep(1);
}

/* 
export default function() {
  var id = Math.ceil(Math.random() * 10000000 + 10000001);
  var url = `http://localhost:3001/api/v1/artists/${id}\albums`;
  var payload = JSON.stringify({ albumName: faker.name.findName(), albumImage: `https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/${faker.random.number({ min: 1, max: 1000 })}.jpg`, publishedYear: faker.random.number({ min: 1960, max: 2018 }), artist_id: id });
  var params = { headers: { 'Content-Type': 'application/json' } };
  http.post(url, payload, params);

  let res = http.post(url, payload, params);
  check(res, {
    'status was 201': r => r.status == 201,
    'transaction time OK': r => r.timings.duration < 1000
  });
  sleep(1);
};
 */
