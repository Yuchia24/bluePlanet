const axios = require('axios');
const restaurantData = require('../restaurantJSON.json');
const restaurantDataKey = Object.keys(restaurantData);
let index = 0
console.log(restaurantDataKey.length)
function runit (index) {
  const name = restaurantDataKey[index];
  console.log("index: ", index, " name: ", name);
  for (let i = 0; i < restaurantData[name].length; i++) {
    if (index == restaurantDataKey.length) {
      console.log("全部 ", index, " 項目執行完畢");
      return false
    }
    const place_id = restaurantData[name][i]
    axios.get('http://localhost:3000/api/googleapi/placedetails', { params: { place_id: place_id } })
      .then(res => {
        if (restaurantData[name].length - 1 == i) {
          index = index + 1;
          runit(index)
        }

      })
      .catch(function (error) {
        console.log(index, error);
        console.log(index + " 錯誤，請重新執行，index：" + index + " 餐廳: " + name);
      });
  }
}

runit(index)