import jsonAssignValue from '../src/';

const data = {
  people: [
    {name: 'Matt', country: 'NZ'},
    {name: 'Pete', country: 'AU'},
    {name: 'Mikey', country: 'NZ'},
  ],
};

const responseDirect = {
  people: [
    {name: 'abcd', country: 'NZ'},
    {name: 'Pete', country: 'AU'},
    {name: 'Mikey', country: 'NZ'},
  ],
};

const responseCb = {
  people: [
    {name: 'Matt John', country: 'NZ'},
    {name: 'Pete', country: 'AU'},
    {name: 'Mikey', country: 'NZ'},
  ],
};

test('Match and assign value direct', () => {
  return expect(
    jsonAssignValue('people[country=NZ].name', 'abcd', {data: data})
  ).toEqual(responseDirect);
});

test('Match and assign value with call back', () => {
  return expect(
    jsonAssignValue(
      'people[country=NZ].name',
      (value: string) => value + ' John',
      {data: data, cb: true}
    )
  ).toEqual(responseCb);
});

test('Match and assign value direct async', async () => {
  return expect(
    await jsonAssignValue(
      'people[country=NZ].name',
      new Promise(resolve => {
        resolve('abcd');
      }),
      {data: data, asyncify: true}
    )
  ).toEqual(responseDirect);
});

test('Match and assign value with call back async', async () => {
  return expect(
    await jsonAssignValue(
      'people[country=NZ].name',
      (value: string) => {
        return new Promise(resolve => {
          resolve(value + ' John');
        });
      },
      {data: data, cb: true, asyncify: true}
    )
  ).toEqual(responseCb);
});
