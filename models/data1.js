const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('data1', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hide: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    is_hack: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "N",
      comment: "是不是 hack 的餐廳"
    },
    is_hotel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    is_ezcheck: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    is_birthday_free: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "N",
      comment: "是不是生日免費"
    },
    has_amount_without_charge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    ezcheck_commission_percentage: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false,
      defaultValue: 0.00
    },
    cat_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: "0"
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    account: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ""
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    },
    country: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "tw",
      comment: "國家"
    },
    currency: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "TWD"
    },
    countryId: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "",
      comment: "國家代碼"
    },
    cityId: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "",
      comment: "第一級城市代碼"
    },
    areaId: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "",
      comment: "第二級城市代碼"
    },
    city: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cityarea: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    cityarea_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    abbr: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      comment: "餐廳簡稱(在管理頁使用)"
    },
    spec1: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "address"
    },
    spec2: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "tel"
    },
    spec3: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "營業時間"
    },
    spec4: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    spec5: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spec6: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "停車資訊"
    },
    spec7: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "網站"
    },
    good_for_family: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "適合家庭聚餐"
    },
    accept_credit_card: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "接受信用卡"
    },
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "停車位"
    },
    outdoor_seating: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "室外座位"
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "無線網路"
    },
    live_music: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    wheelchair_accessible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "無障礙空間"
    },
    is_price_from_questionnaire: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "價位資訊是否從問券來"
    },
    is_support_code_balance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    price1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    promotion_title: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "優惠標題"
    },
    promotion: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "優惠內容"
    },
    check1: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "可刷卡"
    },
    check2: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "附吸煙區"
    },
    check3: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "國民旅遊卡"
    },
    check4: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "可攜帶寵物"
    },
    check5: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "無障礙空間"
    },
    check6: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "附停車位"
    },
    check7: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "有包廂"
    },
    check8: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "有低消"
    },
    total_seat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    intro1: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    intro2: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    menu_link: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: "",
      comment: "(deprecated), we have menu database now"
    },
    picture0: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    thumb0: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    thumb0_mini: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ""
    },
    picture1: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    thumb1: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    thumb1_mini: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "縮小版的圖檔, 主要 for mobile"
    },
    title1: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    picture2: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    thumb2: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    title2: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    picture3: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    thumb3: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    title3: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    stars: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    star1: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    star2: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    star3: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    star4: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    recommend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    top1: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    book: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    cdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    env: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    map: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lat: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lng: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    instagram_location_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    },
    foursquare_location_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    },
    facebook_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    },
    facebook_location_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    },
    tourism_reference_docket: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: ""
    },
    timezone: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "Asia\/Taipei",
      comment: "時區"
    },
    reserved_time: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 15,
      comment: "訂位保留時間"
    },
    prepay_confirmation_mail_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    premium: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    has_premium_seat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否有商務艙定位"
    },
    source: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: "EZTABLE"
    },
    locale: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: "en_US",
      comment: "default_locale"
    },
    minimum_spend_value: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true,
      defaultValue: 0.00
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2100-01-01 00:00:00",
      comment: "餐廳合約到期時間，到期後所有相關功能自動下架 (暫時沒作用，給 FB 加入的餐廳記錄用，2013年底前要實作完成)"
    },
    is_test: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    menu_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    highlight: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    search_tags: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    recommended_dishes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    suitable_purpose: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    opening_meta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cutline_meta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cuisine_category: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    disable_note: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Reason disabled restaurant"
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    meal_rules: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    config: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updated_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'data1',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "cat_id + city",
        using: "BTREE",
        fields: [
          { name: "cat_id", length: 255 },
          { name: "city" },
        ]
      },
      {
        name: "hide",
        using: "BTREE",
        fields: [
          { name: "hide" },
          { name: "cat_id", length: 255 },
          { name: "city" },
        ]
      },
      {
        name: "premium",
        using: "BTREE",
        fields: [
          { name: "premium" },
        ]
      },
      {
        name: "prepay_confirmation_mail_required",
        using: "BTREE",
        fields: [
          { name: "prepay_confirmation_mail_required" },
        ]
      },
      {
        name: "updated_datetime",
        using: "BTREE",
        fields: [
          { name: "updated_datetime" },
        ]
      },
      {
        name: "active",
        using: "BTREE",
        fields: [
          { name: "active" },
        ]
      },
      {
        name: "is_price_from_questionnaire",
        using: "BTREE",
        fields: [
          { name: "is_price_from_questionnaire" },
        ]
      },
      {
        name: "good_for_family",
        using: "BTREE",
        fields: [
          { name: "good_for_family" },
        ]
      },
      {
        name: "accept_credit_card",
        using: "BTREE",
        fields: [
          { name: "accept_credit_card" },
        ]
      },
      {
        name: "parking",
        using: "BTREE",
        fields: [
          { name: "parking" },
        ]
      },
      {
        name: "outdoor_seating",
        using: "BTREE",
        fields: [
          { name: "outdoor_seating" },
        ]
      },
      {
        name: "wifi",
        using: "BTREE",
        fields: [
          { name: "wifi" },
        ]
      },
      {
        name: "wheelchair_accessible",
        using: "BTREE",
        fields: [
          { name: "wheelchair_accessible" },
        ]
      },
      {
        name: "expired_date",
        using: "BTREE",
        fields: [
          { name: "expired_date" },
        ]
      },
      {
        name: "country",
        using: "BTREE",
        fields: [
          { name: "country" },
        ]
      },
    ]
  });
};
