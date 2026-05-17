export interface Building {
  id: number;
  name: string;
  year: string;
  function: string;
  address: string;
  image_url: string;
  restoration_url?: string; // 可选：用于“时光修复师”功能的修复后的图片，如果不填则默认使用 image_url
  structure_url: string;
  description: string;
  x: number; // Percent from left on map
  y: number; // Percent from top on map
  geometry?: {
    parts: {
      shape: 'box' | 'cylinder' | 'roof' | 'arch_wall' | 'balcony';
      position: [number, number, number];
      scale: [number, number, number];
      rotation?: [number, number, number];
      color?: string;
      stage: number; // 0: Foundation, 1: Main, 2: Detail, 3: Roof
    }[];
  };
}

export const buildings: Building[] = [
  {
    id: 47,
    name: "达华公寓",
    year: "1935–1937",
    function: "现代风格",
    address: "长宁区延安西路918号",
    image_url: "/达华公寓.jpg",
    restoration_url: "/达华内部.jpg", // 填入修复后的图片链接
    structure_url: "/达华结构.jpg",
    description: "邬达克自行投资开发，有“小国际饭店”之称。十层公寓，当时该地区最高建筑。底层北面临街为门厅和电梯，南面一套公寓建筑师自住。标准层一梯三户，两大一小，大公寓朝南设大阳台。顶层两套带露台。设计受欧洲现代住宅影响，西班牙、日本专业杂志曾报道，与纽特拉、格罗皮乌斯等大师作品同刊，显示邬达克的国际知名度。1937年邬达克全家搬入底层居住，直至1947年离沪。1999年列为优秀历史建筑。现为达华宾馆，沿延安西路或南面花园可欣赏外观，大厅等公共部位开放。",
    x: 60.5,
    y: 8.5,
    geometry: {
      parts: [
        // Stage 0: Foundation
        { shape: 'box', position: [0, 0.05, 0], scale: [4.5, 0.1, 3], color: '#beb7a4', stage: 0 },
        
        // Stage 1: Main Structure (Stepped Volumes)
        { shape: 'box', position: [-0.8, 1.5, 0], scale: [2.0, 3, 1.4], color: '#fcfaf2', stage: 1 }, // Left Tower
        { shape: 'box', position: [0.8, 1, 0], scale: [1.6, 2, 1.2], color: '#fcfaf2', stage: 1 }, // Right Section (Lower)
        { shape: 'box', position: [0.8, 2.25, 0], scale: [1.2, 0.5, 1.0], color: '#fcfaf2', stage: 1 }, // Right Section (Setback)
        
        // Stage 2: Horizontal Balcony Bands & Vertical details
        // Left tower balconies
        { shape: 'box', position: [-0.8, 0.8, 0.75], scale: [1.8, 0.1, 0.1], color: '#ffffff', stage: 2 },
        { shape: 'box', position: [-0.8, 1.2, 0.75], scale: [1.8, 0.1, 0.1], color: '#ffffff', stage: 2 },
        { shape: 'box', position: [-0.8, 1.6, 0.75], scale: [1.8, 0.1, 0.1], color: '#ffffff', stage: 2 },
        { shape: 'box', position: [-0.8, 2.0, 0.75], scale: [1.8, 0.1, 0.1], color: '#ffffff', stage: 2 },
        { shape: 'box', position: [-0.8, 2.4, 0.75], scale: [1.8, 0.1, 0.1], color: '#ffffff', stage: 2 },
        
        // Curved Corner Balcony Ends
        { shape: 'cylinder', position: [0.1, 0.8, 0.6], scale: [0.3, 0.1, 0.3], color: '#ffffff', stage: 2 },
        { shape: 'cylinder', position: [0.1, 1.2, 0.6], scale: [0.3, 0.1, 0.3], color: '#ffffff', stage: 2 },
        { shape: 'cylinder', position: [0.1, 1.6, 0.6], scale: [0.3, 0.1, 0.3], color: '#ffffff', stage: 2 },
        { shape: 'cylinder', position: [0.1, 2.0, 0.6], scale: [0.3, 0.1, 0.3], color: '#ffffff', stage: 2 },
        { shape: 'cylinder', position: [0.1, 2.4, 0.6], scale: [0.3, 0.1, 0.3], color: '#ffffff', stage: 2 },

        // Stage 3: Roof details
        { shape: 'box', position: [-0.8, 3.05, 0], scale: [2.1, 0.1, 1.5], color: '#2a2a2a', stage: 3 },
        { shape: 'box', position: [0.8, 2.55, 0], scale: [1.3, 0.1, 1.1], color: '#2a2a2a', stage: 3 }
      ]
    }
  },
  {
    id: 27,
    name: "孙科住宅",
    year: "1929–1931",
    function: "西班牙风格 + 文艺复兴 / 巴洛克",
    address: "长宁区延安西路1262号",
    image_url: "/孙科住宅.jpg",
    restoration_url: "/孙科内部.jpg", // 填入修复后的图片链接
    structure_url: "/孙科结构.jpg",
    description: "邬达克原为自己兴建，因孙科帮忙解决慕尔堂的麻烦而感恩低价转让。孙科是孙中山独子，曾任多部部长、上海交大校长。建筑为假三层，砖木混合，约1000平方米。西班牙特征明显：红色筒瓦坡屋面、尖券门廊、螺旋柱、鱼鳞状拉毛粉刷。同时融合意大利文艺复兴的圆拱券、塔司干柱式，以及巴洛克的贝壳形拱券。室内柚木楼梯，柳桉木席纹地板，壁炉各异。八边形会客厅有交叉拱顶。现为上海生物制品研究所办公楼，不对外开放，从番禺路围墙外可窥见部分外观。",
    x: 33.0,
    y: 33.0,
    geometry: {
      parts: [
        { shape: 'box', position: [0, 0.05, 0], scale: [4, 0.1, 3], color: '#beb7a4', stage: 0 },
        { shape: 'box', position: [-1.2, 0.5, -0.2], scale: [1.4, 1.0, 1.8], color: '#e5dec9', stage: 1 },
        { shape: 'arch_wall', position: [-1.2, 0.4, 0.75], scale: [1.2, 0.8, 0.1], color: '#d8cfb4', stage: 2 },
        { shape: 'box', position: [0.2, 0.5, 0], scale: [1.6, 1.0, 2.0], color: '#e5dec9', stage: 1 },
        { shape: 'arch_wall', position: [0.2, 0.4, 1.05], scale: [1.4, 0.8, 0.1], color: '#d8cfb4', stage: 2 },
        { shape: 'cylinder', position: [1.5, 0.6, 0.2], scale: [1.2, 1.2, 1.2], color: '#e5dec9', stage: 1 },
        { shape: 'balcony', position: [0.2, 1.1, 1.15], scale: [1.2, 0.05, 0.3], color: '#2a2a2a', stage: 3 },
        { shape: 'roof', position: [-1.2, 1.2, -0.2], scale: [1.6, 0.6, 2.0], color: '#9e3a1d', stage: 3 },
        { shape: 'roof', position: [0.2, 1.2, 0], scale: [1.8, 0.6, 2.2], color: '#9e3a1d', stage: 3 },
        { shape: 'cylinder', position: [1.5, 1.4, 0.2], scale: [1.3, 0.4, 1.3], color: '#9e3a1d', stage: 3 }
      ]
    }
  },
  {
    id: 24,
    name: "邬达克自宅",
    year: "1930",
    function: "英国都铎复兴",
    address: "长宁区番禺路129号",
    image_url: "/邬达克自宅.jpg",
    restoration_url: "/邬达克内部.jpg", // 填入修复后的图片链接
    structure_url: "/邬达克结构.jpg",
    description: "邬达克第二处自宅，典型英国乡村风格：露明木结构、陡峭红瓦坡顶、老虎窗、高烟囱。南面有大花园，三个子女在此度过童年。原为普益地产项目，邬达克购下已建部分结构，重点设计立面、室内和细部。因越界筑路区域市政管道问题，花园雨水倒灌，六年交涉未果，1936年转卖给德国外交官，全家搬到达华公寓。1964年后归长宁区教育局，花园上建旅游职校。现正改造，底层将建成邬达克纪念馆。改造后外观和底层将对公众开放。",
    x: 42.0,
    y: 47.0,
    geometry: {
      parts: [
        // Stage 0: Foundation
        { shape: 'box', position: [0, 0.05, 0], scale: [3.5, 0.1, 2.5], color: '#beb7a4', stage: 0 },
        
        // Stage 1: Main Structure
        { shape: 'box', position: [0.2, 0.5, 0], scale: [2.5, 1, 1.8], color: '#f4f1ea', stage: 1 }, // Main body
        { shape: 'box', position: [-0.8, 1.2, 0.4], scale: [0.6, 2.8, 0.6], color: '#8b4513', stage: 1 }, // Iconic Tall Chimney
        { shape: 'box', position: [-0.2, 1.4, 0], scale: [1.8, 0.8, 1.6], color: '#ffffff', stage: 1 }, // Second floor
        
        // Stage 2: Details & Timber Framing
        { shape: 'box', position: [0.8, 0.5, 0.91], scale: [0.8, 0.9, 0.1], color: '#2a1a0a', stage: 2 }, // Window frame area
        { shape: 'box', position: [0.5, 1.4, 0.81], scale: [0.05, 0.8, 0.05], color: '#2a1a0a', stage: 2 }, // Timber vertical 1
        { shape: 'box', position: [0, 1.4, 0.81], scale: [0.05, 0.8, 0.05], color: '#2a1a0a', stage: 2 }, // Timber vertical 2
        { shape: 'box', position: [-0.5, 1.4, 0.81], scale: [0.05, 0.8, 0.05], color: '#2a1a0a', stage: 2 }, // Timber vertical 3
        { shape: 'box', position: [-0.8, 2.7, 0.4], scale: [0.7, 0.2, 0.7], color: '#5d2e0c', stage: 2 }, // Chimney cap
        
        // Stage 3: Steep Roofs
        { shape: 'box', position: [0.2, 2.1, 0.4], scale: [2.8, 0.1, 2], rotation: [0.6, 0, 0], color: '#9e3a1d', stage: 3 }, // Roof slope 1 (Main)
        { shape: 'box', position: [0.2, 2.1, -0.4], scale: [2.8, 0.1, 2], rotation: [-0.6, 0, 0], color: '#9e3a1d', stage: 3 }, // Roof slope 2 (Main)
        { shape: 'box', position: [1.2, 1.1, 0.5], scale: [1, 0.1, 1.2], rotation: [0.4, 0.78, 0], color: '#9e3a1d', stage: 3 }, // Small gable roof
      ]
    }
  },
  {
    id: 31,
    name: "哥伦比亚住宅圈",
    year: "1928-1932",
    function: "多种（英、美、意、西等）",
    address: "长宁区新华路119、155、185、211、236、248、276、294、329弄部分住宅",
    image_url: "/哥伦比亚(1).jpg",
    restoration_url: "/上海可参观的老建筑（20_100）茑屋书店_2_红桃桃_来自小红书网页版.jpg", // 填入修复后的图片链接
    structure_url: "/哥伦比亚结构.jpg",
    description: "美商普益地产公司购地开发高档住宅区，共82块基地。邬达克设计至少26栋，仅5种标准户型，却有13种立面样式（5种英国式，6种美国式，以及意大利式、西班牙式）。原规划包括新华路南侧多弄及北侧沿街地块。留存至今的洋房多住6-8户人家，花园种菜晒衣，部分改为幼儿园或酒吧。著名的圆形别墅“蛋糕房”（329弄36号）是否为邬达克作品尚待考证。该区域多为私宅，内部不对外开放，沿新华路或在弄堂内可欣赏外观和花园。",
    x: 32.0,
    y: 78.0,
    geometry: {
      parts: [
        // Foundation
        { shape: 'box', position: [0, 0.05, 0], scale: [3, 0.1, 2.2], color: '#beb7a4', stage: 0 },
        
        // Ground Floor (Bistro look)
        { shape: 'box', position: [0, 0.45, 0], scale: [2, 0.9, 1.6], color: '#4e342e', stage: 1 },
        
        // Second Floor (Residential look)
        { shape: 'box', position: [0, 1.25, 0], scale: [2, 0.7, 1.6], color: '#fdfcf0', stage: 1 },
        
        // Prominent Green Bay Window
        { shape: 'cylinder', position: [0, 1.25, 0.8], scale: [0.7, 0.7, 0.7], color: '#1b5e20', stage: 2 },
        { shape: 'box', position: [0, 0.85, 0.85], scale: [0.6, 0.1, 0.6], color: '#1b5e20', stage: 2 }, // Base of bay window
        
        // Roof
        { shape: 'box', position: [0, 1.8, 0.4], scale: [2.3, 0.1, 1.8], rotation: [0.5, 0, 0], color: '#8d3010', stage: 3 },
        { shape: 'box', position: [0, 1.8, -0.4], scale: [2.3, 0.1, 1.8], rotation: [-0.5, 0, 0], color: '#8d3010', stage: 3 },
        
        // Dormer
        { shape: 'box', position: [0.7, 1.9, 0.6], scale: [0.3, 0.3, 0.3], color: '#ffffff', stage: 2 },
        { shape: 'roof', position: [0.7, 2.1, 0.6], scale: [0.4, 0.2, 0.4], color: '#8d3010', stage: 3 }
      ]
    }
  },
  {
    id: 10,
    name: "诺曼底公寓",
    year: "1923–1926",
    function: "法国文艺复兴",
    address: "徐汇区海中路1836-1858号",
    image_url: "/诺曼底.jpg",
    restoration_url: "/诺曼底内部.jpg", // 填入修复后的图片链接
    structure_url: "/诺曼底结构.jpg",
    description: "沪上最早的外廊式公寓。基地位于五条马路交汇的三角形岔道口，形似战舰。平面呈熨斗形，北面沿福开森路设开口改善采光。底层为商铺，沿霞飞路设拱廊式骑楼。八层高，共63套公寓，户型灵活。外观为法国文艺复兴风格，一二层斩假石仿石墙面，三至七层清水红砖，顶层檐部与基座呼应。最初住户多为外企高管。1953年更名武康大楼，赵丹、秦怡等曾寓居于此。“文革”时被称为“上海跳水池”。1995年列为优秀历史建筑。外观和门厅可供参观，室内不开放。",
    x: 80.0,
    y: 82.0,
    geometry: {
      parts: [
        // Stage 0: Foundation (Triangular site)
        { shape: 'box', position: [0, 0.05, 0], scale: [4, 0.1, 5], color: '#beb7a4', stage: 0 },

        // Stage 1: Main Structure (Iconic Red Brick Wukang Mansion)
        // Unified Wedge Design: Front Cylinder + Two Meeting Wings
        { shape: 'cylinder', position: [0, 1.4, 1.4], scale: [1.3, 2.0, 1.3], color: '#8d2d1b', stage: 1 },
        { shape: 'box', position: [0.55, 1.4, -0.3], scale: [0.7, 2.0, 3.8], rotation: [0, 0.18, 0], color: '#8d2d1b', stage: 1 },
        { shape: 'box', position: [-0.55, 1.4, -0.3], scale: [0.7, 2.0, 3.2], rotation: [0, -0.18, 0], color: '#8d2d1b', stage: 1 },

        // Stage 2: Base (White Stone) - Integrated into the wedge flow
        { shape: 'cylinder', position: [0, 0.4, 1.4], scale: [1.4, 0.8, 1.4], color: '#f0ede6', stage: 2 },
        { shape: 'box', position: [0.6, 0.4, -0.3], scale: [0.8, 0.8, 3.9], rotation: [0, 0.18, 0], color: '#f0ede6', stage: 2 },
        { shape: 'box', position: [-0.6, 0.4, -0.3], scale: [0.8, 0.8, 3.3], rotation: [0, -0.18, 0], color: '#f0ede6', stage: 2 },
        
        // Stage 2: Horizontal Cornice Bands
        { shape: 'cylinder', position: [0, 0.85, 1.4], scale: [1.5, 0.1, 1.5], color: '#f0ede6', stage: 2 },
        { shape: 'box', position: [0.6, 0.85, -0.3], scale: [0.9, 0.1, 4.0], rotation: [0, 0.18, 0], color: '#f0ede6', stage: 2 },
        { shape: 'box', position: [-0.6, 0.85, -0.3], scale: [0.9, 0.1, 3.4], rotation: [0, -0.18, 0], color: '#f0ede6', stage: 2 },

        // Stage 3: Attic Levels and Top Terrace
        { shape: 'cylinder', position: [0, 2.5, 1.4], scale: [1.2, 0.3, 1.2], color: '#fcfaf2', stage: 3 },
        { shape: 'box', position: [0.5, 2.5, -0.3], scale: [0.7, 0.3, 3.7], rotation: [0, 0.18, 0], color: '#fcfaf2', stage: 3 },
        { shape: 'box', position: [-0.5, 2.5, -0.3], scale: [0.7, 0.3, 3.1], rotation: [0, -0.18, 0], color: '#fcfaf2', stage: 3 },

        // Stage 3: Architectural Details
        { shape: 'box', position: [0.7, 2.8, -1.0], scale: [0.15, 0.4, 0.15], color: '#8d2d1b', stage: 3 },
        { shape: 'box', position: [-0.7, 2.8, -1.0], scale: [0.15, 0.4, 0.15], color: '#8d2d1b', stage: 3 },
      ]
    }
  },
  {
    id: 30,
    name: "交通大学工程馆",
    year: "1931",
    function: "现代装饰艺术",
    address: "徐汇区华山路1954号",
    image_url: "/交通大学工程馆.jpg",
    restoration_url: "/交大工程馆：百年建筑的新春之约🎉_6_乐斯基_来自小红书网页版.jpg", // 填入修复后的图片链接
    structure_url: "/交通结构.png",
    description: "回字形平面，中间大内院。底层有各种实验室，上层为教室、报告厅等。1960年加建至三层，建筑面积扩至近1.3万平方米。钢筋混凝土结构，外观简洁，深褐色泰山面砖，锯齿形石材壁柱强调竖线条，与广学大楼手法类似。南入口叠涩门洞，北入口三个尖券门，流露哥特偏爱。走廊宽三米多，沿墙设水磨石长座凳。1932年建成后先用作工业展览馆，1933年在此首展中国制造的卡车。钱学森（1934届）、江泽民（1947届）曾在此学习。上海交大徐汇校区内，基本开放参观。",
    x: 46.0,
    y: 96.0,
    geometry: {
      parts: [
        // Foundation
        { shape: 'box', position: [0, 0.05, 0], scale: [4.5, 0.1, 3], color: '#beb7a4', stage: 0 },
        
        // Main Brick Body (Taishan Bricks)
        { shape: 'box', position: [0, 0.6, 0], scale: [4, 1.2, 2.2], color: '#734d31', stage: 1 },
        
        // Vertical Stone Pillars (强调竖线条)
        { shape: 'box', position: [-1.8, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },
        { shape: 'box', position: [-1.4, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },
        { shape: 'box', position: [-1.0, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },
        { shape: 'box', position: [-0.6, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },
        
        { shape: 'box', position: [0.6, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },
        { shape: 'box', position: [1.0, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },
        { shape: 'box', position: [1.4, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },
        { shape: 'box', position: [1.8, 0.65, 1.15], scale: [0.1, 1.3, 0.15], color: '#e8e4db', stage: 2 },

        // Prominent Main Entrance Area
        { shape: 'box', position: [0, 0.6, 1.2], scale: [0.8, 1.4, 0.4], color: '#f4f1ea', stage: 2 }, // White portal
        { shape: 'box', position: [0, 0.4, 1.349], scale: [0.4, 0.6, 0.1], color: '#1a1a1a', stage: 2 }, // Doorway depth
        
        // Top Horizontal Bands
        { shape: 'box', position: [0, 1.25, 0], scale: [4.1, 0.15, 2.3], color: '#e8e4db', stage: 3 },
        
        // Roof
        { shape: 'box', position: [0, 1.35, 0], scale: [4.0, 0.1, 2.2], color: '#2a2a2a', stage: 3 }
      ]
    }
  }
];
