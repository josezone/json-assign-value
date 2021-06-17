import jsonQuery, {Result} from 'json-query';
import {
  Selector,
  SelectorWithQueryParams,
  Options,
  Context,
} from './index.interface';

export = function assignValue(
  selector: Selector | SelectorWithQueryParams,
  assigningValue: Context,
  options: Options
): Promise<Context> | Context {
  let rootData = options.data;
  try {
    rootData = JSON.parse(JSON.stringify(options.data));
  } catch (err) {
    const error = new Error('Not a json');
    if (options.asyncify) {
      Promise.reject(error);
      return;
    }
    return error;
  }
  if (!rootData) {
    const error = new Error('Not a valid input');
    if (options.asyncify) {
      Promise.reject(error);
      return;
    }
    return error;
  }
  const jsonQueryResult: Result = jsonQuery(selector, options);
  if (!jsonQueryResult.key && !jsonQueryResult.value) {
    if (options.asyncify) {
      Promise.resolve(rootData);
      return;
    }
    return rootData;
  }
  if (options.asyncify) {
    return new Promise((resolve, reject) => {
      jsonQueryResult.parents.reduce(
        async (accumulatorP, currentValue: any, index) => {
          return accumulatorP.then(async (accumulator: any) => {
            const keys = currentValue.key;
            if (keys === null && jsonQueryResult.parents.length - 1 !== index) {
              return accumulator;
            }
            let val1 = accumulator[keys];
            if (!val1) {
              val1 = accumulator;
            }
            if (jsonQueryResult.parents.length - 1 === index) {
              try {
                if (
                  Array.isArray(jsonQueryResult.value) &&
                  jsonQueryResult.value.length
                ) {
                  let _val1 = val1;
                  let val1Keys: any;
                  if (!Array.isArray(val1)) {
                    _val1 = Object.values(val1);
                    val1Keys = Object.keys(val1);
                  }
                  if (options.cb === true) {
                    await Promise.all(
                      _val1.map(async (element: any, indexVal1: number) => {
                        if (val1Keys) {
                          return (val1[val1Keys[indexVal1]] =
                            await assigningValue(jsonQueryResult.value));
                        } else {
                          if (Array.isArray(jsonQueryResult.key)) {
                            await Promise.all(
                              jsonQueryResult.key.map(async (element: any) => {
                                return (val1[element] = await assigningValue(
                                  jsonQueryResult.value
                                ));
                              })
                            );
                          } else {
                            return (val1[indexVal1][jsonQueryResult.key] =
                              await assigningValue(jsonQueryResult.value));
                          }
                        }
                      })
                    );
                  } else {
                    await Promise.all(
                      _val1.map(async (element: any, indexVal1: number) => {
                        if (val1Keys) {
                          return (val1[val1Keys[indexVal1]] =
                            await assigningValue);
                        } else {
                          if (Array.isArray(jsonQueryResult.key)) {
                            await Promise.all(
                              jsonQueryResult.key.map(async (element: any) => {
                                return (val1[element] = await assigningValue);
                              })
                            );
                          } else {
                            return (val1[indexVal1][jsonQueryResult.key] =
                              await assigningValue);
                          }
                        }
                      })
                    );
                  }
                } else {
                  if (options.cb === true) {
                    val1[jsonQueryResult.key] = await assigningValue(
                      jsonQueryResult.value
                    );
                  } else {
                    val1[jsonQueryResult.key] = await assigningValue;
                  }
                }
                resolve(rootData);
              } catch (err) {
                reject(err);
              }
            }
            return val1;
          });
        },
        Promise.resolve(rootData)
      );
    });
  } else {
    jsonQueryResult.parents.reduce((accumulator, currentValue: any, index) => {
      const keys = currentValue.key;
      if (keys === null && jsonQueryResult.parents.length - 1 !== index) {
        return accumulator;
      }
      let val2 = accumulator[keys];
      if (!val2) {
        val2 = accumulator;
      }
      if (jsonQueryResult.parents.length - 1 === index) {
        if (
          Array.isArray(jsonQueryResult.value) &&
          jsonQueryResult.value.length
        ) {
          let _val2 = val2;
          let val2Keys: any;
          if (!Array.isArray(val2)) {
            _val2 = Object.values(val2);
            val2Keys = Object.keys(val2);
          }
          if (options.cb === true) {
            _val2.forEach((element: any, indexVal2: number) => {
              if (val2Keys) {
                val2[val2Keys[indexVal2]] = assigningValue(
                  jsonQueryResult.value
                );
              } else {
                if (Array.isArray(jsonQueryResult.key)) {
                  jsonQueryResult.key.forEach((element: any) => {
                    val2[element] = assigningValue(jsonQueryResult.value);
                  });
                } else {
                  val2[indexVal2][jsonQueryResult.key] = assigningValue(
                    jsonQueryResult.value
                  );
                }
              }
            });
          } else {
            _val2.forEach((element: any, indexVal2: number) => {
              if (val2Keys) {
                val2[val2Keys[indexVal2]] = assigningValue;
              } else {
                if (Array.isArray(jsonQueryResult.key)) {
                  jsonQueryResult.key.forEach((element: any) => {
                    val2[element] = assigningValue;
                  });
                } else {
                  val2[indexVal2][jsonQueryResult.key] = assigningValue;
                }
              }
            });
          }
        } else {
          if (options.cb === true) {
            val2[jsonQueryResult.key] = assigningValue(jsonQueryResult.value);
          } else {
            val2[jsonQueryResult.key] = assigningValue;
          }
        }
      }
      return val2;
    }, rootData);
    return rootData;
  }
};
