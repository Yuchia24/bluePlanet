const apiHelper = require('../../utils/helper')
// const { data1, vender, vender_restaurant_keyword_rawData, vender_input_data } = require('../../models')
const token = process.env.token
const qs = require('qs')
const db = require("../../models");
const Vender_input_data = db.vender_input_data;
const Vender_cuisine_dish_rawData = db.vender_cuisine_dish_rawData;
const Vender_cuisine_type_rawData = db.vender_cuisine_type_rawData;
const Vender_restaurant_keyword_rawData = db.vender_restaurant_keyword_rawData;
const Vender_restaurant_review_rawData = db.vender_restaurant_review_rawData;
const Vender_suitable_purpose_rawData = db.vender_suitable_purpose_rawData;
const { BadRequest, NotFound } = require('../../utils/errors')
const dayjs = require("dayjs");
const time = dayjs().format("YYYY-MM-DD", { timeZone: "zh-tw" });

const restaurantController = {
  getDish: async (req, res, next) => {
    try {
      // ./dish?kw={kw}
      const { kw } = req.query;
      if (!kw) {
        throw new BadRequest("Missing kw for request.");
      }
      const response = await apiHelper.post(
        "/dish",
        qs.stringify({
          token,
          kw,
        })
      );
      if (!response.data.result.length) {
        throw new NotFound("No match keywords for your request.");
      }
      return res.status(200).json({
        status: "success",
        result: response.data.result,
      });
    } catch (error) {
      next(error);
    }
  },

  getType: async (req, res, next) => {
    try {
      // ./type?kw={kw}
      const { kw } = req.query;
      if (!kw) {
        throw new BadRequest("Missing kw for request.");
      }
      const response = await apiHelper.post(
        "/type",
        qs.stringify({
          token,
          kw,
        })
      );
      if (!response.data.result.length) {
        throw new NotFound("No match keywords for your request.");
      }
      return res.status(200).json({
        status: "success",
        result: response.data.result,
      });
    } catch (error) {
      next(error);
    }
  },
  getPurpose: async (req, res, next) => {
    try {
      // ./purpose?kw={kw}
      const { kw } = req.query;
      if (!kw) {
        throw new BadRequest("Missing kw for request.");
      }
      const response = await apiHelper.post(
        "/purpose",
        qs.stringify({
          token,
          kw,
        })
      );
      if (!response.data.result.length) {
        throw new NotFound("No match keywords for your request.");
      }
      return res.status(200).json({
        status: "success",
        result: response.data.result,
      });
    } catch (error) {
      next(error);
    }
  },
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

      Vender_input_data.create(
        {
          keyword: JSON.stringify(response.data.result),
          vender_id: 1,

          restaurant_id: restaurant_id,
          created_datetime: time,
          updated_datetime: time,
        },
        { where: { restaurant_name: search_name } }
      );

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

async function getVenderKeyword (req, res) {
  try {
    const { kw } = req.body
    const response = await apiHelper.post('/all_kw',
      qs.stringify({
        token,
        kw
      })
    )
    console.log('response', response.data.result)
  } catch (error) {
    console.log(error)
  }
}

async function getVenderPurpose (req, res) {
  try {
    const { kw } = req.body
    const response = await apiHelper.post('/purpose',
      qs.stringify({
        token,
        kw
      })
    )
    console.log('response', response.data.result)
  } catch (error) {
    console.log(error)
  }
}

async function getVenderType (req, res) {
  try {
    const { kw } = req.body
    const response = await apiHelper.post('/type',
      qs.stringify({
        token,
        kw
      })
    )
    console.log('response', response.data.result)
  } catch (error) {
    console.log(error)
  }
}

async function getVenderDish (req, res) {
  try {
    const { kw } = req.body
    const response = await apiHelper.post('/dish',
      qs.stringify({
        token,
        kw
      })
    )
    console.log('response', response.data.result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = restaurantController
