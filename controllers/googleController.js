const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const GoogleService = require('../service/googleService')
const googleService = new GoogleService()
const moment = require('moment-timezone');

const env = process.env.NODE_ENV || 'development'
const GOOGLEAPIKEY = process.env.GOOGLEAPIKEY

const GoogleUrl = {
  details: `https://maps.googleapis.com/maps/api/place/details/json?language=zh-TW&fields=formatted_address,place_id,rating,price_level,geometry,formatted_phone_number,name,user_ratings_total,review,photo,website&key=${GOOGLEAPIKEY}`
}

const nameMatch = {
  'ChIJJVBTsHGpQjQRaCf_yDIMgJo': '十二廚自助餐廳 - 台北喜來登大飯店',
  'ChIJV9lVLX4EbjQRrg782N80ADk': '鐵板燒餐廳 - 高雄漢來大飯店',
  'ChIJqyir1IN2bjQRiXewQla4fxQ': '藝術轉角餐廳',
  'ChIJeUp8ZTKqQjQREjxsd92csjg': '遠東Café – 香格里拉台北遠東國際大飯店',
  'ChIJ32GmDMSrQjQRSIMBVtVqVVQ': '一品花雕雞 - 旗艦店',
  'ChIJuQeY1LurQjQRrnGuucsl6ls': '泰市場 Spice Market - 誠品信義旗艦店',
  'ChIJz4riBoCsQjQRdxUsaJjd9L4': '青柚精緻料理',
  'ChIJ1S3Z6barQjQRUnd4BwJ6NkY': 'Diamond Tony\'s 101 隨意鳥地方高空觀景餐廳 - 台北101 85樓',
  'ChIJjwfWf7CrQjQR8HEILkaBigk': 'Lawry\'s 勞瑞斯牛肋排餐廳',
  'ChIJ90ln_c-rQjQRp2jywC1baXs': 'TRASTEVERE 托拉斯特義式餐廳',
  'ChIJARQH6rQXaTQR3Hv_Rg0OfEQ': '品東西自助百匯 - 兆品酒店 台中',
  'ChIJPQdsrggFbjQRflZx7WUqNlQ': '漢來海港餐廳-巨蛋店 (漢神巨蛋 5F)',
  'ChIJlz_vNM2rQjQRE6rpay_T7zk': '燈燈庵 Tou Tou An',
  'ChIJwapOL3OpQjQRYr1UAErcchc': '欣葉咖哩匠-中山店',
  'ChIJebmGHF0CaDQRWO0ixisIWgU': '山間倉房(創作日本料理）',
  'ChIJ-9KRTed3bjQRFHmXmi0Ru0w': '大廳茶軒 (1F) – 香格里拉台南遠東國際大飯店',
  'ChIJz6dU4fY-aTQRzUmUSwJm7-Y': '美井日本料理餐廳 - 清新溫泉飯店',
  'ChIJv5byCVAEbjQRL1hitP0tQ-0': '帕莎蒂娜義大利屋',
  'ChIJwWTo7789aTQRwlKhRs_-hEo': '法月當代法式料理',
  'ChIJJTyBS-w9aTQRaiRmvHMvPOs': 'The Prime-Grill 極炙牛排館-台中日月千禧酒店',
  'ChIJg23ep7erQjQRBv_Lx8g60wY': 'Cheers - 台北君悅酒店 Grand Hyatt Taipei',
  'ChIJ1ScfqLerQjQRTa3iQBoxd-0': '茶苑 - 台北君悅酒店 Grand Hyatt Taipei',
  'ChIJty1ap7erQjQRSqbaYk3H3qA': '漂亮廣式海鮮餐廳 - 台北君悅酒店 Grand Hyatt Taipei',
  'ChIJuS1ap7erQjQRFIt2P8e5H4s': '寶艾西餐廳 - 台北君悅酒店 Grand Hyatt Taipei',
  'ChIJdZ_9pcQ1aDQRP4vgHJRQMnE': '食譜自助百匯 - 新竹芙洛麗大飯店 FLEURLIS',
  'ChIJfZSdL8erQjQRjsNy2UpsKFs': 'DOZO 創作和食居酒屋',
  'ChIJV94GZq0FbjQRQY933VAgGX0': '鈺善閣•素•養生懷石 - 高雄店',
  'ChIJp-C8mOWrQjQRpv-sdo-_3UA': '京炙鐵板燒',
  'ChIJ4TtsHVCpQjQRPZMEBFzvSJs': '地中海牛排館 - 歐華酒店',
  'ChIJ7Rxn2cSrQjQRpvh8keKJeS4': '先酒肴 清酒吧 Senn Sake Dining Bar',
  'ChIJo18ku752bjQR1FbchVbqFxY': '漢來蔬食-台南店(南紡夢時代 3F)​',
  'ChIJ9ZOimMmrQjQRP3JGviky7qo': '圓桌鐵板燒涮涮鍋-鐵板燒區 (國父紀念館)',
  'ChIJxbEZD1upQjQRyfjMu-Mp3-M': '江雁塘新時尚鐵板燒',
  'ChIJO63sFXOpQjQRFM9rOIgVQSQ': '瓦法奇朵 (台北車站店)',
  'ChIJ26tEXRKsQjQR6zoJGtcMMvw': 'Top Cap Steakhouse by Danny 老饕牛排',
  'ChIJYUc2pWE9aTQRBI7YRs-dJIY': '大樹先生的家 - Mr.Tree 親子餐廳 (台中崇德店)',
  'ChIJcUrc3J2rQjQRHqNWF_SN9OE': 'Que 原木燒烤餐廳 - 台北松山意舍酒店',
  'ChIJ237JQ-GrQjQRpeVPMLvU0FM': '桂香私宅 Flower No\'5 RSVP',
  'ChIJyZU3_IOpQjQRrxAPBhAQ0Fg': 'O\'steak 歐牛排法餐廳',
  'ChIJ-zjzoFupQjQRyy9ktmhxoMQ': '百家樂精緻鐵板燒',
  'ChIJ_8aE096rQjQRMZWKD12k3Rw': '香港私宅打邊爐',
  'ChIJk4QjwQYFbjQR3bFTiAF-0vE': '加楓一店',
  'ChIJxcAvmgQFbjQR0oPpMoIXk40': '加楓二店 Fh2 - Taphouse & Pizza Pub',
  'ChIJjc9-QsyrQjQRGxQCt3ntoHo': 'MissGreen 創意蔬食',
  'ChIJU3HcKMmrQjQRwf6iiRPYT_c': 'The Green Room 泰式蔬食',
  'ChIJY_rUWSkfaDQROohFB92OxHk': '哇啦哇啦 日式食堂',
  'ChIJAdqFyWmpQjQRsxXJXkWEVfw': '旬採鮨処（中山店）',
  'ChIJA_NuesSrQjQRuXxT27wDH1A': '布娜飛比利時啤酒餐廳BravoBeer - 台北市民店',
  'ChIJPbbLlLurQjQRLIcggeKFtRk': '樂天皇朝信義店 - 微風信義 4樓',
  'ChIJqekue9yrQjQR6OpTrxGHO9U': '一號糧倉（蟬聯兩屆 米其林必比登推介）',
  'ChIJJz6U45I2aDQRz7x3YeN_k2k': '娘子韓食 - 竹北店',
  'ChIJ2fU_gtCrQjQROOgHeO7Ogts': '大戶屋 - 忠孝復興店',
  'ChIJDTR3oTGqQjQRSPyf_xkD6_8': '黑熊愛跳舞',
  'ChIJC0ET6dGrQjQRXAeCB9_CIQ0': '凱恩斯岩燒牛排 - 台北大安店',
  'ChIJmd5Mp-irQjQRDdakY2jb_IA': 'Bencotto - 台北文華東方酒店',
  'ChIJxbHSzc6rQjQRAey5W33EXYc': 'Nkụ北歐柴火料理',
  'ChIJuaevwBioQjQRYxPlADKSd5U': '望月樓 - Mega 50餐飲及宴會',
  'ChIJk327S2ipQjQRWrAkeyEOUMA': 'Buttermilk 摩登美式餐廳 - 台北中山意舍酒店',
  'ChIJfWgSz7urQjQRaEH7wh6epww': '紅花鐵板燒 - 新光三越A4',
  'ChIJw1DAn96rQjQRx3_RDBn20P4': 'Mama thai 11',
  'ChIJdQTisUOuQjQRX2oBJUIvu9I': 'The Restaurant - 三二行館 Villa 32 (台北米其林指南 2019)',
  'ChIJC3A0YO-rQjQR14SXdF53Q6s': 'Ruth\'s Chris Steak House 茹絲葵經典牛排館（民生店）',
  'ChIJZyob64waaDQRnfJecRywwNk': '太子西餐廳 - 大板根森林溫泉酒店',
  'ChIJz5KY0xKsQjQR0v8v3gVaMrk': 'Chili\'s 奇利斯美式餐廳 - 台北大直店',
  'ChIJXc_ssu48aTQRfMuEMpuuJYo': '北澤壽喜燒專門店 - 台中大里俱樂部',
  'ChIJd3k7ux2qQjQRyvJ-tVd8k8M': '帝一帝王蟹頂級燒烤吃到飽',
  'ChIJta4EMumnQjQRggVaMGSrEkM': '天賜百匯 - 天賜良緣大飯店 (新莊)',
  'ChIJW4kbrzCpQjQRxxBtWAsngfI': 'QING YA 青雅中餐廳 - 台北新板希爾頓酒店',
  'ChIJr13nGC2pQjQR5w9xxdWp2uQ': 'SociAbility 逸廊 - 台北新板希爾頓酒店',
  'ChIJHwwwfcirQjQRd45wOzI-NUI': 'Mr. Bean Taipei',
  'ChIJeegCW7ivQjQR-ECgwsUzRSY': '奇諾義大利披薩屋 - 天母店',
  'ChIJTW7pYgCpQjQRPNs6YTzyJ0s': 'DA ANTONIO 大安東尼 By 隨意鳥地方 - Cozzi 民生店',
  'ChIJ7xoii2ipQjQR_WVuI-pD7mc': '小田食光',
  'ChIJsbZtjcSrQjQR1kcL4c-g_7g': '吉兆割烹壽司（連續三年 米其林指南一星推薦）',
  'ChIJh5neYXKpQjQR3cahZZAK_3M': 'YELOSEOUL BISTRO 首爾餐酒館',
  'ChIJba7o3wGoQjQRtKN3Mj4aR1w': 'Wing Flight 美式漢堡',
  'ChIJkYsAXoOpQjQR-xV2rN5ajtw': 'WOODSTONE 木石義式歐風餐廳',
  'ChIJq1qle9GrQjQRWr4qbaBVS5k': 'Uranium 鈾咖啡餐酒館',
  'ChIJ_bRik8WrQjQRZ5zEMoWeJHE': 'TBS 剔邦饈 Teppanyaki',
  'ChIJif-sI8arQjQR8xPQsGhwaqQ': '豬跳舞小餐館 Dancing Pig (國父紀念館站)',
  'ChIJC6mZ2WirQjQREZ3Spd4j7qg': '犇 極上 BEN Teppan Suprême - 微風南山館',
  'ChIJ0VAU88arQjQRmR9PV5SQNEQ': 'La MESA Taipei 西班牙餐廳',
  'ChIJn3zAY9ipQjQRqxA0MCAuRr4': 'CAFE49 美侖商旅 Parkview Taipei',
  'ChIJo8aS0kGoQjQRaLmvQ82pJF8': '起家厝 早午餐 Khi Ke Thsu Cafè',
  'ChIJ968HWzU1aDQR4hxbIB4-lIw': '隱居風味居酒屋（新竹店）',
  'ChIJK0jUQNSzaTQRyefDEXnbIvo': 'Le Vino 酒吧 (苗栗馥藝金鬱金香酒店)',
  'ChIJU7P-NW2zaTQRPVTkb_r9YuY': '趣吧(苗栗馥藝金鬱金香酒店)',
  'ChIJhxtvkqOrQjQRbbpjh4uldU8': 'GYUU NIKU ステーキ牛丼專門店(信義區永春站)',
  'ChIJc6Pzc5irQjQRaeLUDS9I4FM': '波記茶餐廳',
  'ChIJgf8pw2WpQjQRkkKefGoynjg': '韓太閣韓國烤肉料理',
  'ChIJ49L9eCatQjQRLwzZ3KLSZZ4': '唐點小聚 - 美麗華店',
  'ChIJDYbbyAarQjQRaQlaLPoT-Bw': '悄悄杯居酒屋 The Cup',
  'ChIJSWC_6CGvQjQRsDMl6CUA5v8': 'R bar逸庭｜Tea lab茶坊 - 台北士林萬麗酒店',
  'ChIJwb-ZopusQjQRa9UP3mg8mZs': '掌門精釀啤酒 - 內湖店',
  'ChIJ30DoS26pQjQRNxLXPpiA4vs': 'GiLiGiLi 韓國釜山餐酒館',
  'ChIJ91iZjKcCaDQRTrWr5yno8MM': '原素食府',
  'ChIJL1lxmsarQjQRcr3FPLZXlTA': '三虎居酒屋 Izakaya Santora',
  'ChIJd9QKFaWuQjQRLPGO-ltaXj4': '便所歡樂主題餐廳 - 士林店',
  'ChIJ11DfGrQfaDQR1ejdqSYtepo': 'MyPlate 淨食煮藝',
  'ChIJPfsK9LEfaDQRvv0C4sIzTik': '梳子餐廳',
  'ChIJBYy1e-cfaDQRFwXQYZdoQNg': '川門子時尚餐廳',
  'ChIJo5ndMQmpQjQRIduldE4rC8k': 'Swiio bar & Max Tattoo',
  'ChIJB_kFnJqpQjQRhD2pNjsJvr0': '輕晨日和',
  'ChIJczRua7EfaDQR0O7Y2GugQD8': '君子蘭新鐵板料理',
  'ChIJ28b6UKWuQjQRGsSWgNSk0Ms': 'HUGE BURGER',
  'ChIJ_ZATFfirQjQRGANumXQ4QBA': '真心台菜 - 微風復興',
  'ChIJ-TCqY8cfaDQRcGJ-p6fGjmg': 'OLIVE橄欖餐廳 牛仔好忙',
  'ChIJKcM2uWSrQjQRfon8d41sbGo': 'UMAMI金色三麥 - 微風南山館',
  'ChIJd_4jAOmnQjQR0Zo-GXXeO5U': '英國奶奶•午茶•司康 Britshake2',
  'ChIJJbbpCO-nQjQRuywHPBaKsZo': '驛德世紀酒店 Yidear Hotel',
  'ChIJ835km7urQjQR3757tWKUX2s': '饗瘦鐵板燒',
  'ChIJnzq4k7qrQjQR6hr5KHPDqzo': 'YOLO\'s Cafe 南京敦北店',
  'ChIJ3VrBaXupQjQRFZs0voXjLmI': '華山町餐酒館',
  'ChIJ_Rrv1e6rQjQRK7Fjrbm39Ls': 'Crazy Cart Cafe 甩尾卡丁車親子主題餐廳（南港車站）',
  'ChIJXwETAMWrQjQR-QFnnEaQgQM': '無聊咖啡 AMBI- CAFE（忠孝敦化站）',
  'ChIJQffxkOipQjQRabwA1GkxMMU': '隱食家 Inns+',
  'ChIJi5itCxaoQjQRpoom7K8gOe4': 'The Thali 塔哩印度料理',
  'ChIJLQcIZKE9aTQR14wSy2Tj_jk': '天菜豐巢 VeGood 蔬食百匯',
  'ChIJaxAF2XmrQjQRf4L7gZKvA7w': '紅皇后 川酒 · Red Queen Bistro',
  'ChIJr1_Szuo1aDQRgiJ4vR0u1e4': '饗食天堂 - 新竹大遠百店',
  'ChIJI_L1CrWrQjQRF25laf4cP4Y': '豐滿早午餐 - 信義世貿店',
  'ChIJ6Se2seWrQjQRu2TEIks2WZk': '日本橋玉井',
  'ChIJQUti-tyrQjQRXfXiCYPtOdo': '菊川日式料理館',
  'ChIJhyEhFcWrQjQRgght_BCEXyU': 'Mosun 墨賞新鐵板料理',
  'ChIJqY40N0-pQjQRQEGZlh-Z4zU': 'GAUCHO高卓人阿根廷炭烤餐廳 - 花博店',
  'ChIJRwajKqmtQjQR6MjShu9KMfg': '奎克咖啡Cuiqu Coffee (台北瑞光店)',
  'ChIJXwdir4w9aTQRt2C9uQCyCz4': '兩班家韓式碳烤 - 新光三越台中中港店',
  'ChIJ7ZWHJ_arQjQRRJSQlatQjhs': '美滋鍋台灣 - ATT 4 FUN 7樓',
  'ChIJb4GnpwSpQjQRMRMY_y39No0': '花園thai thai - 台北花園大酒店',
  'ChIJV8swk9urQjQRkFDlHPxFiIU': '成吉思汗蒙古烤肉',
  'ChIJ4cpvoSSrQjQR5W4pYJS6iQw': 'Meal Room Shabu米釉贅沢鍋物',
  'ChIJeVHXFdurQjQRVD6SKmn0sn0': 'MUCHOYAKI',
  'ChIJ_Ru1vWCpQjQR8-pfPe2Nh28': '大戈壁蒙古烤肉',
  'ChIJR4abX5WrQjQRTMaNABDKaSY': '胖肚肚燒肉吃到飽 - 京華店',
  'ChIJyZKvmiuqQjQR2RPTk1xQsLA': '賈福廚房',
  'ChIJ38RUD3GpQjQRVrmbCFu1l1w': '東北之家酸菜白肉鍋-青島店',
  'ChIJoTKZlSiqQjQRC5mNp-sB1no': '遊藝思文創空間',
  'ChIJmxpmfIWpQjQRuO6qJKcBk74': '印渡風情餐廳 - 師大店',
  'ChIJwy-aD-mrQjQRVgFhtDRtFHI': 'AW Cafe Wine Bistro',
  'ChIJaytpZJFraTQRBagzR-DYeCA': '六代目三角',
  'ChIJM5GYCXmrQjQRMkWE9SdrTCU': '汰汰熱情酒場',
  'ChIJtXV75HypQjQR76Xu5eXd140': '功成名就-即興小廚',
  'ChIJ4dFKL2mpQjQRiviQctcwyG0': '極醬太郎日式燒肉',
  'ChIJC-NtUaipQjQR8N8h9c2Dyic': '吾皇大大 - 朕的鍋物',
  'ChIJSbWCSOGrQjQRg1pZq3BUzWo': '古記雞.創意料理.私房菜居酒屋 - 信義店',
  'ChIJe1ASN0-pQjQR6QOD6aT3V5w': 'POPEYE波派地中海料理餐廳',
  'ChIJXT0da4mpQjQREM-Snt6purU': '瑪莉珍披薩 MaryjanePizza Bar - 大安店',
  'ChIJheTg5pg9aTQR1AnNFHr-4mI': '爵旋轉串燒',
  'ChIJM_x8YHY9aTQRuIABQWvKSXA': '唐太盅 - 台中公益店',
  'ChIJiYQ5US2rQjQRAtAr32vLwbY': '雞湯大叔 - 信義店',
  'ChIJD89DxiSrQjQRQRTp8YLKRU0': '洒麻辣',
  'ChIJX22cCrirQjQR5Lbl38xlHLs': '立德 Café 83 自助百匯餐廳',
  'ChIJ26FqOeirQjQRNusS-BruQ1Y': '秋紅園野菜鍋物',
  'ChIJSZ89XCmrQjQRlzpduQTbttA': '筷炒KUAICHAO',
  'ChIJNT9WgVmpQjQRE7hzA6m7OOY': 'Okaeri 你回來了型男食堂',
  'ChIJX7shG_-pQjQRts5nA_DSF_s': '一齊和牛燒肉',
  'ChIJuR5tTU2qQjQRcbn1I5h9fy4': '蔬漫小姐Miss Shu maan. House',
  'ChIJwbqqwnqsQjQR_BK5OK4Mz_c': '福慧根湯-内湖店',
  'ChIJ2YAYnsirQjQRkE0D2f_-vVc': 'Le Kief 菱玖洋服',
  'ChIJZ0-PYGqpQjQRGN1Vmu_fasw': '一號倉庫炭火串燒Bar',
  'ChIJg2v7jFupQjQReKpQJrgplUg': '笑月小館',
  'ChIJTRROfuqpQjQRRUPEeM0J5XI': '同安樂二店',
  'ChIJwZ6Ps0ipQjQRD8dhXPgHx3E': '駱師父醬味川客菜',
  'ChIJ_7yvWoOpQjQRh2PT2UAEdqA': 'Alley 麗餐廳 - 台北中山希爾頓逸林酒店',
  'ChIJPe1m11UFbjQRPVLyE8lPMTU': '默鐵板私廚料理',
  'ChIJIaHQhRCpQjQRQqt-zIYLMBY': '千歲亭日式碳火燒肉',
  'ChIJq76fdpqpQjQRNjy41yaOvYU': '稻邸 D.House',
  'ChIJP1Z6T5SrQjQRhe4kVfuLFQQ': '御蓮齋Omni Ambrosia',
  'ChIJQaQZrxOpQjQRNE9Rfg3wNKo': '天馬行空城堡親子餐廳',
  'ChIJQw8hNRqpQjQRfZeLN-2sRpA': '舉人豆花',
  'ChIJHbh_Q8irQjQRXrY4zBnQ-0c': '拾玖串燒酒場',
  'ChIJW_VbuLWpQjQR-WuUuf9CGGs': 'OMMA壽喜燒串鍋物專門店',
  'ChIJHUUhkdWnQjQRrc5IKHTEs0I': '喜園火鍋 - 新莊幸福店',
  'ChIJC0SQ1ps9aTQRjvAU-Y4RWiU': '撫子日式小料理',
  'ChIJxQHSFpKrQjQRk9ISEoyuPUA': '湊一鍋 - 旗艦店',
  'ChIJ0z6shECoQjQRBaFvAXr2_mg': '誠壽司',
  'ChIJIxIyOuerQjQRqQ42OhCTo4I': '依個伴小食',
  'ChIJ37LpmZirQjQRCy1Yj1ZEj1A': '嘉味薑母鴨',
  'ChIJHd1KNBaoQjQRwn7ARPHi1BA': 'Worthy Food活西美式餐飲',
  'ChIJ3_Fj-7anQjQRCnuSEi1KEb0': '沉雨晴 - 林口店',
  'ChIJg8NoTJ49aTQR4IEuEaG-nO8': '富雅商行',
  'ChIJMUZFklKpQjQRUJkYHAsT874': '馬友友印度廚房 - 大直店 MIK 5',
  'ChIJBSh3tq09aTQR2lPCaxTbH0s': '踏踏地球',
  'ChIJCeQnfY8XaTQRhW81UPTp7lI': '綠萼159創意料理',
  'ChIJD6T8_xmoQjQRoxz2fa3iyxI': 'G+9鮮釀餐廳 - 板橋國光店',
  'ChIJB21VvxSpQjQRV9S18iotapg': 'Wangtea Lab 有記名茶',
  'ChIJrdjU38ipQjQRTAHafEjbUvY': '優鮮主意',
  'ChIJE_hRu8mrQjQRovS8vx85l7o': 'Tree 法式餐廳',
  'ChIJgZxezuA9aTQRaOvHHv9mt_Y': '艾聚 IG 餐廳',
  'ChIJm8XljSwDaDQRT2kvFa0qnms': '豆腐村Tofu Village - 京站小碧潭店',
  'ChIJrSLEN04DaDQRhCriaku1h6c': '銀座杏子日式豬排 - 京站小碧潭店',
  'ChIJk76i3I89aTQRVHoew46e2c0': 'Enrich restaurant & cafe 素食',
  'ChIJcYLAw5c9aTQRxrMwri1CQvM': '迦樂悅複合式養生蔬食',
  'ChIJnXqK4GCrQjQRzH0MsQ73ihI': '太陽是我的靈魂 - 民生門市',
  'ChIJHUVzDTypQjQRakCtV6NV9GE': '辛麻泰正宗麻辣鍋',
  'ChIJKy2Mn4k9aTQR-5n8eFiK58U': '達摩成吉思汗',
  'ChIJ9667I7OrQjQR7X-ZvFyBZsg': 'Taste Test 試試工作室 x CF',
  'ChIJ46zBIgYhaDQRk1XJXcRaD5g': '叁和院台灣風格飲食 - 桃園華泰店',
  'ChIJc8hGpRKpQjQRUkWSkqwdDGU': '上村牧場 - 微風北車店',
  'ChIJtXf8PoKrQjQRLUkyC1AD3Gc': '初宅 ONE HOUSE PIZZA',
  'ChIJKxKgDjqpQjQRczlRjJP2VzM': 'Triple 20 飛鏢運動休閒館',
  'ChIJwQFTOsarQjQRsPULoBgEabk': '咚咚家韓式豬肉',
  'ChIJd0gn6emrQjQRE0y9wuH7rlM': '石石鍋創',
  'ChIJm13nCKg9aTQR8sq2qNj7ixU': '博多漁家磯貝 台灣一號店台中（居酒屋）',
  'ChIJyelJTCavQjQRVS1lpjxGqPM': '璦的小廚 Ann\'s Kitchen',
  'ChIJ1xHErpWrQjQRArN2tnpsk7M': '水料理溫體牛咖哩飯',
  'ChIJDygZSKp3bjQRAtS_auKYwNI': '食東西 - 台南煙波大飯店',
  'ChIJK5GmlHyrQjQRPNKNdgjHRhU': '有間小館',
  'ChIJLxlLh-qrQjQRlC40U-np8EQ': '御膳煲養生雞湯館',
  'ChIJY6AEfNY9aTQRFyau1s4g0XQ': '寶林咖啡蔬食 - 自由店',
  'ChIJW9v321qpQjQRy6jN1tM1e38': 'HANA錵鐵板燒餐廳',
  'ChIJ2wlVphVOXTQRWj-M4msCgYo': '貓小路cafe',
  'ChIJQxmGxeimQjQRun9sTcOjBwk': '奇真順香萊',
  'ChIJS85rhROnQjQRoMkN0oE7nvk': '咖竅 Cotcha Coffee - 林口麗園店',
  'ChIJPUaCx2CpQjQR1WHoOgjHAJ0': '四平小館',
  'ChIJz-0AMgaHhYARa5Zih2XLOco': 'Honey Pig',
  'ChIJa-waFlSnQjQROJwa3pQ3gYE': 'なべNABE日式火鍋.燒烤',
  'ChIJmd5Mp-irQjQRkQCK9c7iI7A': '但馬家鐵板燒 Taijimaya Teppanyaki - 台北文華東方酒店',
  'ChIJ1YEHtn8EbjQRksk_u_gwLkk': '龍蝦酒殿 - 高雄漢來大飯店',
  'ChIJhTB0_82rQjQR8WwGMgHgpDc': '肉 RÒU by T-HAM',
  'ChIJkdBIiqerQjQRrjxD6TnTm1A': '重點 El punto 南美風情臻品料理',
  'ChIJ8UhrSZU9aTQROScVBtpYMrE': '傑克兄弟牛排館 - 臺中公益店 JACK BROTHERS STEAKHOUSE',
  'ChIJrYYudW2pQjQRrhgYhBIJW0c': '雲軒西餐廳 La Rotisserie - 君品酒店',
  'ChIJ1X3jKvQ9aTQRHnqODT346v4': '台中商旅 CHEZ HUNG 餐廳',
  'ChIJuZE8QF6pQjQRrqhIwAqs7jk': '金穗坊西餐廳 - 慶泰大飯店',
  'ChIJ1Tiu4GUXaTQRiqXxsVRYcWo': '君宴百食匯 KingBuffet',
  'ChIJb_0oXAOpQjQRdPkFe0lVMd0': '伍伍零 - 中和店',
  'ChIJb6eU51auQjQRxy44Lb9d14o': '蒔蘿香草蔬食餐廳 - 北投店',
  'ChIJc7l3cxWoQjQR_xsZ0fWP0Ss': '松果小食 桌上遊戲 x 聚會空間',
  'ChIJiy5a_44EbjQRM4SCfkK9SVU': '冒煙的喬美式墨西哥餐廳(高雄忠孝店)',
  'ChIJhR-n2uIDaDQRlOsacXE-eW0': 'TGI FRIDAYS 星期五餐廳 (信義餐廳)',
  'ChIJj9LfqhQ9aTQRW2wCJJ5HnK4': 'bistro88 light - 台中永春店',
  'ChIJ_VhzorcFbjQRi5eVDDfM9fQ': '捷記小麵館',
  'ChIJ3yj8dG2pQjQRuGSM0rmKPG0': '小湯匙Thai Noodles&Brunch - 京站台北店',
  'ChIJr4YudW2pQjQR6s2rQHF7d5A': '頤宮中餐廳 Le Palais - 君品酒店',
  'ChIJPQYkRjipQjQRjXwuNiedh2A': '餡老滿 - 台北吉林店',
  'ChIJTd2GUpupQjQRwfmVO91gBL8': '酒肉朋友 燒烤私房菜 - 南京店',
  'ChIJbyjqFOGrQjQRcgDeyFJHbjE': '南魂 串燒·酒場'
}
const googleController = {

  getDetails: async (req, res, next) => {
    try {
      // 跟Google要資料
      const { response, status } = await googleService.getGoogleData(GoogleUrl.details, req.query.place_id)
      const reviews = response.result.reviews;
      const photos = response.result.photos;
      // const place_id = response.result.place_id;
      const googleApiDetailModel = {
        address: response.result.formatted_address,
        place_id: response.result.place_id,
        formatted_phone_number: response.result.formatted_phone_number,
        name: response.result.name,
        price_level: response.result.price_level,
        rating: response.result.rating,
        user_ratings_total: response.result.user_ratings_total,
        locationLat: response.result.geometry.location.lat,
        locationLng: response.result.geometry.location.lng,
        website: response.result.website
      }

      // 新增 Google API data
      const detailExisted = await venderRepository.getGoogleDetails(googleApiDetailModel.place_id)
      if (detailExisted.length == 0) {
        await venderRepository.insertGoogleDetails(googleApiDetailModel);
      } else {
        await venderRepository.updateGoogleDetails(googleApiDetailModel);
      }

      // 新增 Google Review data
      reviews.map(async (review) => {
        const reviewDatetime = moment.tz(review.time * 1000, "Asia/Taipei").format("YYYY-MM-DD HH:mm:ss");
        const googleApiReviewModel = {
          place_id: response.result.place_id,
          author_name: review.author_name,
          author_url: review.author_url,
          language: review.language,
          rating: review.rating,
          relative_time_description: review.relative_time_description,
          text: review.text,
          review_date: reviewDatetime
        };
        const reviewExisted = await venderRepository.getGoogleReviews(googleApiReviewModel.place_id, googleApiReviewModel.author_name, googleApiReviewModel.review_date);
        if (reviewExisted.length == 0) {
          await venderRepository.insertGoogleReviews(googleApiReviewModel);
        } else {
          await venderRepository.updateGoogleReviews(googleApiReviewModel);
        }
      });

      // 新增 Google Photo data
      photos.map(async (photo) => {
        const html_attributions = JSON.stringify(photo.html_attributions);
        const googleApiPhotoModel = {
          place_id: response.result.place_id,
          height: photo.height,
          width: photo.width,
          html_attributions: html_attributions,
          photo_reference: photo.photo_reference
        };
        const photoExisted = await venderRepository.getGooglePhotos(googleApiPhotoModel.photo_reference);
        if (photoExisted.length == 0) {
          await venderRepository.insertGooglePhotos(googleApiPhotoModel);
        } else {
          await venderRepository.updateGooglePhotos(googleApiPhotoModel);
        }
      });






      // return data
      return res.status(200).json({
        status: 'success',
        response: response.result
      })
    } catch (error) {
      // 紀錄log
      console.log(error)
    }
  }

}

module.exports = googleController
