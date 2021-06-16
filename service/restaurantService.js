// 引入 types -> vender_enum
const types = [
  { kind: 'type', keyId: '1', value: '西式料理' },
  { kind: 'type', keyId: '2', value: '亞洲料理' },
  { kind: 'type', keyId: '3', value: '中東料理' },
  { kind: 'type', keyId: '4', value: '東南亞料理' },
  { kind: 'type', keyId: '5', value: '多國料理' },
  { kind: 'type', keyId: '6', value: '美式料理' },
  { kind: 'type', keyId: '7', value: '愛爾蘭料理' },
  { kind: 'type', keyId: '8', value: '法國料理' },
  { kind: 'type', keyId: '9', value: '西班牙料理' },
  { kind: 'type', keyId: '10', value: '義大利料理' },
  { kind: 'type', keyId: '11', value: '德國料理' },
  { kind: 'type', keyId: '12', value: '葡萄牙料理' },
  { kind: 'type', keyId: '13', value: '日式料理' },
  { kind: 'type', keyId: '14', value: '中式料理' },
  { kind: 'type', keyId: '15', value: '韓式料理' },
  { kind: 'type', keyId: '16', value: '粵式料理' },
  { kind: 'type', keyId: '17', value: '印度料理' },
  { kind: 'type', keyId: '18', value: '星馬料理' },
  { kind: 'type', keyId: '19', value: '泰式料理' },
  { kind: 'type', keyId: '20', value: '印尼料理' },
  { kind: 'type', keyId: '21', value: '俄羅斯料理' },
  { kind: 'type', keyId: '22', value: '墨西哥料理' },
  { kind: 'type', keyId: '23', value: '創意料理' },
  { kind: 'type', keyId: '24', value: '英式料理' },
  { kind: 'type', keyId: '25', value: '澳洲料理' },
  { kind: 'type', keyId: '26', value: '土耳其料理' },
  { kind: 'type', keyId: '27', value: '希臘料理' },
  { kind: 'type', keyId: '28', value: '巴西料理' },
  { kind: 'type', keyId: '29', value: '台式料理' },
  { kind: 'type', keyId: '30', value: '地中海料理' },
  { kind: 'type', keyId: '31', value: '黎巴嫩料理' },
  { kind: 'type', keyId: '32', value: '新疆料理' },
  { kind: 'type', keyId: '33', value: '蒙古料理' },
  { kind: 'type', keyId: '34', value: '川菜' },
  { kind: 'type', keyId: '35', value: '湘菜' },
  { kind: 'type', keyId: '36', value: '潮州菜' },
  { kind: 'type', keyId: '37', value: '上海菜' },
  { kind: 'type', keyId: '38', value: '京菜' },
  { kind: 'type', keyId: '39', value: '瑞士料理' },
  { kind: 'type', keyId: '40', value: '菲律賓料理' },
  { kind: 'type', keyId: '41', value: '越南料理' },
  { kind: 'type', keyId: '42', value: '北歐料理' },
  { kind: 'dish', keyId: '1', value: '下午茶' },
  { kind: 'dish', keyId: '2', value: '酒吧' },
  { kind: 'dish', keyId: '3', value: '燒烤' },
  { kind: 'dish', keyId: '4', value: '早午餐' },
  { kind: 'dish', keyId: '5', value: '自助餐' },
  { kind: 'dish', keyId: '6', value: '漢堡' },
  { kind: 'dish', keyId: '7', value: '咖哩' },
  { kind: 'dish', keyId: '8', value: '點心' },
  { kind: 'dish', keyId: '9', value: '火鍋' },
  { kind: 'dish', keyId: '10', value: '懷石料理' },
  { kind: 'dish', keyId: '11', value: '義大利麵' },
  { kind: 'dish', keyId: '12', value: '比薩' },
  { kind: 'dish', keyId: '13', value: '拉麵' },
  { kind: 'dish', keyId: '14', value: '海鮮' },
  { kind: 'dish', keyId: '15', value: '麻辣火鍋' },
  { kind: 'dish', keyId: '16', value: '牛排' },
  { kind: 'dish', keyId: '17', value: '串燒' },
  { kind: 'dish', keyId: '18', value: '壽司' },
  { kind: 'dish', keyId: '19', value: '鐵板燒' },
  { kind: 'dish', keyId: '20', value: '素食/蔬食' },
  { kind: 'dish', keyId: '21', value: '單點式' },
  { kind: 'dish', keyId: '22', value: '套餐' },
  { kind: 'dish', keyId: '23', value: '西班牙下酒菜' },
  { kind: 'dish', keyId: '24', value: '豬排' },
  { kind: 'dish', keyId: '25', value: 'SPA' },
  { kind: 'dish', keyId: '26', value: '咖啡廳' },
  { kind: 'dish', keyId: '27', value: '茶館' },
  { kind: 'dish', keyId: '28', value: '主題餐廳' },
  { kind: 'dish', keyId: '29', value: '私廚' },
  { kind: 'dish', keyId: '30', value: '餐酒館' },
  { kind: 'dish', keyId: '31', value: '親子餐廳' },
  { kind: 'dish', keyId: '32', value: '寵物餐廳' },
  { kind: 'dish', keyId: '33', value: '居酒屋' },
  { kind: 'dish', keyId: '34', value: '合菜( or 桌菜)' },
  { kind: 'dish', keyId: '35', value: '啤酒餐廳' },
  { kind: 'dish', keyId: '36', value: '輕食' },
  { kind: 'dish', keyId: '37', value: '壽喜燒' },
  { kind: 'dish', keyId: '38', value: '生魚片' },
  { kind: 'purpose', keyId: '1', value: '浪漫約會' },
  { kind: 'purpose', keyId: '2', value: '商業聚餐' },
  { kind: 'purpose', keyId: '3', value: '家庭聚餐' },
  { kind: 'purpose', keyId: '4', value: '宴會型聚餐' },
  { kind: 'purpose', keyId: '5', value: '朋友聚餐' },
  { kind: 'purpose', keyId: '6', value: '生日慶祝' },
  { kind: 'purpose', keyId: '7', value: '聚會、聚餐' },
  { kind: 'purpose', keyId: '8', value: '親友' },
  { kind: 'purpose', keyId: '9', value: '慶祝' }
]

module.exports = class RestaurantService {
  matchKeyId (array) {
    return new Promise((resolve, reject) => {
      resolve(
        array.map((item) => {
          if (item.type) {
            item.word = item.type
            delete item.type
          }
          return {
            count: item.count,
            keyId: types.find((type) => type.value === item.word).keyId
          }
        })
      )
    })
  }

  getInputData (oldArray, newArray) {
    return new Promise((resolve, reject) => {
      resolve(
        newArray.filter((newItem) => {
          if (newItem.word) {
            // keyword API
            const target = oldArray.find((oldItem) => oldItem.value === newItem.word) || {}
            const condition1 = !oldArray.find((oldItem) => oldItem.value === newItem.word)
            const condition2 = target.count !== newItem.count
            return condition1 || condition2
          }
          // other API
          return !oldArray.map((oldItem) => oldItem.keyId).includes(newItem.keyId)
        })
      )
    })
  }

  getRemoveData (oldArray, newArray) {
    return new Promise((resolve, reject) => {
      resolve(
        oldArray.filter((oldItem) => {
          if (oldItem.value) {
            // keyword API
            const target = newArray.find((newItem) => newItem.word === oldItem.value) || {}
            const condition1 = newArray.find((newItem) => newItem.word === oldItem.word)
            const condition2 = target.count !== oldItem.count
            console.log('condition1', condition1, 'condition2', condition2)
            return condition1 || condition2
          }
          // other API
          return !newArray.map((newItem) => newItem.word).includes(oldItem.value)
        })
      )
    })
  }
}
