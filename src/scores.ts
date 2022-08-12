interface ForecastData {
  properties?: {
    [key: string]: {
      uom: string;
      values: [
        {
          validTime: string;
          value: number;
        }
      ]
    }
  }
}

interface Field {
  ideal: {
    min: number;
    max: number;
  };
  acceptable: {
    min: number;
    max: number;
  };
}

interface Fields {
  [key: string]: Field;
}

interface Score {
  value: number;
  validTime: string;
  score: number;
}

const Scores = {
  scoreActivity: (fields: Fields, forecastData: ForecastData) => {
    if (!(forecastData &&
      forecastData.properties &&
      Object.keys(forecastData.properties).length > 0 &&
      fields &&
      Object.keys(fields).length > 0)
    ) return;

    let scores: {[key: string]: Score[]} = {};
    console.log('fields: ', fields);
    console.log('forecastData: ', forecastData);
    Object.keys(fields).forEach((field) => {
      const desiredField = fields[field];
      const forecastField = forecastData.properties[field];
      if (forecastField) {
        scores[field] = forecastField.values.map((valObj) => {
          const retVal = {
            validTime: valObj.validTime,
            value: valObj.value,
            score: 0
          };
          if (desiredField.ideal.min < valObj.value && valObj.value < desiredField.ideal.max) {
            retVal.score = 1;
          } else if (desiredField.acceptable.min < valObj.value && valObj.value < desiredField.acceptable.max) {
            retVal.score = .5;
          }
          return retVal;
        })
      }
    })

    return scores;
  }
};

export default Scores;
