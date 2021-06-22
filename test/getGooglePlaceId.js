const axios = require('axios');
const { restaurantNames } = require('./restaurantName');
const GOOGLEAPIKEY = process.env.GOOGLEAPIKEY
let dataList = {};

async function runit (index) {
  if (index == restaurantNames.length) {
    console.log("dataList: ", dataList)
    console.log("全數執行完畢");
    return false;
  }
  console.log("正在執行第 " + index);
  await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=name,place_id&key=${GOOGLEAPIKEY}`, { params: { input: restaurantNames[index] } })
    .then(function (response) {
      console.log(index, response.data.candidates);
      const rows = response.data.candidates;
      rows.map((row) => {
        const name = restaurantNames[index]
        const place_id = row.place_id
        dataList[name] = [];
        dataList[name].push(place_id)
      })
      // console.log(dataList)
      index = index + 1
      runit(index)
    })
    .catch(function (error) {
      console.log(index, error);
      console.log(index + " 錯誤，請重新執行，餐廳：" + restaurantNames[index]);
    });
};

runit(0)