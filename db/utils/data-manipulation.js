// extract any functions you are using to manipulate your data, into this file
exports.createLookup = (data, key, value) => {
  const lookup = {};
  for (let i = 0; i < data.length; i++) {
    lookup[data[i][key]] = data[i][value];
  }
  return lookup;
};

exports.formatArticleData = (articleData) => {
  let answer = [...articleData];

  for (let i = 0; i < answer.length; i++) {
    const article = {...answer[i]}
    const unixDate = answer[i].created_at;
    const jsDate = new Date(unixDate);
    //console.log(jsDate);
    article[i].created_at = jsDate;
    
    //console.log(articleData[i])
  }

  return answer
}
