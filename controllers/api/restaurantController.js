const apiHelper = require('../../utils/helper')
const token = process.env.token
const qs = require('qs')

const {
  Vender_input_data,
  Vender_cuisine_dish_rawData,
  Vender_cuisine_type_rawData,
  Vender_restaurant_keyword_rawData,
  Vender_restaurant_review_rawData,
  Vender_suitable_purpose_rawData,
  Venders
} = require('../../models')

const { BadRequest, NotFound } = require('../../utils/errors')
const dayjs = require("dayjs")
const time = dayjs().format("YYYY-MM-DD", { timeZone: "zh-tw" })

const restaurantController = {
  getKeyword: async (req, res, next) => {
    try {
      // ./keywords?kw={kw}
      const { kw } = req.query;
      if (!kw) {
        throw new BadRequest("Missing kw for request.");
      }
      const response = await apiHelper.post(
        "/all_kw",
        qs.stringify({
          token,
          kw,
        })
      );
      if (!response.data.result.length) {
        throw new NotFound("No match keywords for your request.");
      }

      const search_name = req.body.kw
      const restaurant_id = Vender_input_data.findAll({
        where: {
          restaurant_name: search_name,
        },
      });

      Vender_input_data.create({
        keyword: JSON.stringify(response.data.result),
        vender_id: 1,
        where: { restaurant_name: search_name },
        restaurant_id: restaurant_id,
        created_datetime: time,
        updated_datetime: time
      });

      // const test = await Vender_input_data.findByPk(20);
      // console.log(test);

      Vender_restaurant_keyword_rawData.create({
        vender_id: 1,
        restaurant_id: restaurant_id,
        posted_data: req.body,
        keyword_data: res.data.result
      })

      return res.status(200).json({
        status: "success",
        result: response.data.result,
      });
    } catch (error) {
      next(error);
    }
  },
  getPurpose: async (req, res) => {
    try {
      // ./purpose?restaurant_name={restaurantName}&restaurant_id={restaurantId}
      console.log("query", req.query);
    } catch (error) {
      console.log(error);
    }
  },
  getType: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  getDish: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
};

const venderAction = {
  getVenderKeyword: async (kw) => {
    try {

    } catch (error) {

    }
  },
  getVenderPurpose: async (kw) => {
    try {

    } catch (error) {

    }
  },
  getVenderType: async (kw) => {
    try {

    } catch (error) {

    }
  },
  getVenderDish: async (kw) => {
    try {

    } catch (error) {

    }
  }
}

module.exports = restaurantController
