export const IS_NUMERIC = /^\d+$/;
export const IS_ALPHANUMERIC = /^[0-9A-Z $%*+\-./:]*$/;
export const ModeIndicator = { "numeric": "0001", "alphanumeric": "0010", "byte": "0100", "kanji": "0111" };
export const PAD_BYTES = ["11101100", "00010001"];
export const ModeCapacities = {
  "numeric": {
    "L": [41, 77, 127, 187, 255, 322, 370, 461, 552, 652, 772, 883, 1022, 1101, 1250, 1408, 1548, 1725, 1903, 2061, 2232, 2409, 2620, 2812, 3057, 3283, 3517, 3669, 3909, 4158, 4417, 4686, 4965, 5253, 5529, 5836, 6153, 6479, 6743, 7089],
    "M": [34, 63, 101, 149, 202, 255, 293, 365, 432, 513, 604, 691, 796, 871, 991, 1082, 1212, 1346, 1500, 1600, 1708, 1872, 2059, 2188, 2395, 2544, 2701, 2857, 3035, 3289, 3486, 3693, 3909, 4134, 4343, 4588, 4775, 5039, 5313, 5596, 5877],
    "Q": [27, 48, 77, 111, 144, 178, 207, 259, 312, 364, 427, 489, 580, 621, 703, 775, 876, 948, 1063, 1159, 1224, 1358, 1468, 1588, 1718, 1804, 1933, 2085, 2181, 2358, 2473, 2670, 2805, 2949, 3081, 3244, 3417, 3599, 3791, 3993],
    "H": [17, 34, 58, 82, 106, 139, 154, 202, 235, 288, 331, 374, 427, 468, 530, 602, 674, 746, 813, 919, 969, 1056, 1108, 1228, 1286, 1425, 1501, 1581, 1677, 1782, 1897, 2022, 2157, 2301, 2434, 2566, 2702, 2812, 2956, 3122]
  },
  "alphanumeric": {
    "L": [25, 47, 77, 114, 154, 195, 224, 279, 335, 395, 468, 535, 619, 667, 758, 854, 938, 1046, 1153, 1249, 1352, 1460, 1588, 1704, 1853, 1990, 2132, 2223, 2369, 2520, 2677, 2840, 3009, 3183, 3351, 3537, 3729, 3927, 4087, 4296],
    "M": [20, 38, 61, 90, 122, 154, 178, 221, 262, 311, 366, 419, 483, 528, 600, 656, 734, 816, 909, 970, 1035, 1134, 1248, 1326, 1451, 1542, 1637, 1732, 1839, 1994, 2113, 2238, 2369, 2506, 2632, 2780, 2894, 3054, 3220, 3391],
    "Q": [16, 29, 47, 67, 87, 108, 125, 157, 189, 221, 259, 296, 352, 376, 426, 470, 531, 574, 644, 702, 742, 823, 890, 963, 1041, 1094, 1172, 1263, 1322, 1429, 1499, 1618, 1700, 1787, 1867, 1966, 2071, 2181, 2298, 2420],
    "H": [10, 20, 35, 50, 64, 84, 93, 122, 143, 174, 200, 227, 259, 283, 321, 365, 408, 452, 493, 557, 587, 640, 672, 744, 779, 864, 910, 958, 1016, 1080, 1150, 1226, 1307, 1394, 1431, 1530, 1591, 1658, 1774, 1852]
  },
  "byte": {
    "L": [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1731, 1840, 1952, 2069, 2188, 2303, 2431, 2563, 2699, 2809, 2953],
    "M": [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331],
    "Q": [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663],
    "H": [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273]
  },
  "kanji": {
    "L": [],
    "M": [],
    "Q": [],
    "H": []
  },
}
export const alpanumericTable=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];
export const ModeBitLength = { "numeric": 10, "alphanumeric": 9, "byte": 8, "kanji": 8 };
export const ErrorCorrectionCodeWordsBlock = {
  "1-L": [19, 7, 1, 19, 19],
  "1-M": [16, 10, 1, 16, 16],
  "1-Q": [13, 13, 1, 13, 13],
  "1-H": [9, 17, 1, 9, 9],

  "2-L": [34, 10, 1, 34, 34],
  "2-M": [28, 16, 1, 28, 28],
  "2-Q": [22, 22, 1, 22, 22],
  "2-H": [16, 28, 1, 16, 16],

  "3-L": [55, 15, 1, 55, 55],
  "3-M": [44, 26, 1, 44, 44],
  "3-Q": [34, 18, 2, 17, 17],
  "3-H": [26, 22, 2, 13, 13],

  "4-L": [80, 20, 1, 80, 80],
  "4-M": [64, 18, 2, 32, 64],
  "4-Q": [48, 26, 2, 24, 48],
  "4-H": [36, 16, 4, 9, 36],

  "5-L": [108, 26, 1, 108, 108],
  "5-M": [86, 24, 2, 43, 86],
  "5-Q": [62, 18, 2, 15, 2, 16, 62],
  "5-H": [46, 22, 2, 11, 2, 12, 46],
  
  "6-L": [136, 18, 2, 68, 136],
  "6-M": [108, 16, 4, 27, 108],
  "6-Q": [76, 24, 4, 19, 76],
  "6-H": [60, 28, 4, 15, 60],

  "7-L": [156, 20, 2, 78, 156],
  "7-M": [124, 18, 4, 31, 124],
  "7-Q": [88, 18, 2, 14, 4, 15,88],
  "7-H": [66, 26, 4, 13, 1, 14,66],

  "8-L": [194, 24, 2, 97, 194],
  "8-M": [54, 22, 2, 38, 2, 39,154],
  "8-Q": [110, 22, 4, 18, 2, 19,110],
  "8-H": [86, 26, 4, 14, 2, 15,86],

  "9-L": [232, 30, 2, 116,232],
  "9-M": [182, 22, 3, 36, 2, 37,182],
  "9-Q": [132, 20, 4, 16, 4, 17,132],
  "9-H": [100, 24, 4, 12, 4, 13,100],

  "10-L": [274, 18, 2, 68, 2, 69,274],
  "10-M": [216, 26, 4, 43, 1, 44,216],
  "10-Q": [154, 24, 6, 19, 2, 20,154],
  "10-H": [122, 28, 6, 15, 2, 16,122],

  "11-L": [324, 20, 4, 81,324],
  "11-M": [254, 30, 1, 50, 4, 51, 254],
  "11-Q": [180, 28, 4, 22, 4, 23,180],
  "11-H": [140, 24, 3, 12, 8, 13,140],

  "12-L": [370, 24, 2, 92, 2, 93,370],
  "12-M": [290, 22, 6, 36, 2, 37,290],
  "12-Q": [206, 26, 4, 20, 6, 21,206],
  "12-H": [158, 28, 7, 14, 4, 15,158],

  "13-L": [428, 26, 4, 107,428],
  "13-M": [334, 22, 8, 37, 1, 38,334],
  "13-Q": [244, 24, 8, 20, 4, 21,244],
  "13-H": [180, 22, 12, 11, 4, 12,180],

  "14-L": [461, 30, 3, 115, 1, 116,461],
  "14-M": [365, 24, 4, 40, 5, 41,365],
  "14-Q": [261, 20, 11, 16, 5, 17,261],
  "14-H": [197, 24, 11, 12, 5, 13,197],

  "15-L": [523, 22, 5, 87, 1, 88,523],
  "15-M": [415, 24, 5, 41, 5, 42,415],
  "15-Q": [295, 30, 5, 24, 7, 25,295],
  "15-H": [223, 24, 11, 12, 7, 13,223],

  "16-L": [589, 24, 5, 98, 1, 99,589],
  "16-M": [453, 28, 7, 45, 3, 46,453],
  "16-Q": [325, 24, 15, 19, 2, 20,325],
  "16-H": [253, 30, 3, 15, 13, 16,253],

  "17-L": [647, 28, 1, 107, 5, 108,647],
  "17-M": [507, 28, 10, 46, 1, 47,507],
  "17-Q": [367, 28, 1, 22, 15, 23,367],
  "17-H": [283, 28, 2, 14, 17, 15,283],

  "18-L": [721, 30, 5, 120, 1, 121,721],
  "18-M": [563, 26, 9, 43, 4, 44,563],
  "18-Q": [397, 28, 17, 22, 1, 23,397],
  "18-H": [313, 28, 2, 14, 19, 15,313],

  "19-L": [795, 28, 3, 113, 4, 114,795],
  "19-M": [627, 26, 3, 44, 11, 45,627],
  "19-Q": [445, 26, 17, 21, 4, 22,445],
  "19-H": [341, 26, 9, 13, 16, 14,341],

  "20-L": [861, 28, 3, 107, 5, 108,861],
  "20-M": [669, 26, 3, 41, 13, 42,669],
  "20-Q": [485, 30, 15, 24, 5, 25,485],
  "20-H": [385, 28, 15, 15, 10, 16,385],

  "21-L": [932, 28, 4, 116, 4, 117,932],
  "21-M": [714, 26, 17, 42,714],
  "21-Q": [512, 28, 17, 22, 6, 23,512],
  "21-H": [406, 30, 19, 16, 6, 17,406],

  "22-L": [1006, 28, 2, 111, 7, 112,1006],
  "22-M": [782, 28, 17, 46,782],
  "22-Q": [568, 30, 7, 24, 16, 25,568],
  "22-H": [442, 24, 34, 13,442],

  "23-L": [1094, 30, 4, 121, 5, 122,1094],
  "23-M": [860, 28, 4, 47, 14, 48,860],
  "23-Q": [614, 30, 11, 24, 14, 25,614],
  "23-H": [464, 30, 16, 15, 14, 16,464],

  "24-L": [1174, 30, 6, 117, 4, 118,1174],
  "24-M": [914, 28, 6, 45, 14, 46,914],
  "24-Q": [664, 30, 11, 24, 16, 25,664],
  "24-H": [514, 30, 30, 16, 2, 17,514],

  "25-L": [1276, 26, 8, 106, 4, 107,1276],
  "25-M": [1000, 28, 8, 47, 13, 48,1000],
  "25-Q": [718, 30, 7, 24, 22, 25,718],
  "25-H": [538, 30, 22, 15, 13, 16,538],

  "26-L": [1370, 28, 10, 114, 2, 115,1370],
  "26-M": [1062, 28, 19, 46, 4, 47,1062],
  "26-Q": [754, 28, 28, 22, 6, 23, 754],
  "26-H": [596, 30, 33, 16, 4, 17, 596],

  "27-L": [1468, 30, 8, 122, 4, 123, 1468],
  "27-M": [1128, 28, 22, 45, 3, 46, 1128],
  "27-Q": [808, 30, 8, 23, 26, 24, 808],
  "27-H": [628, 30, 12, 15, 28, 16,628],

  "28-L": [1531, 30, 3, 117, 10, 118,1531],
  "28-M": [1193, 28, 3, 45, 23, 46, 1193],
  "28-Q": [871, 30, 4, 24, 31, 25, 871],
  "28-H": [661, 30, 11, 15, 31, 16, 661],

  "29-L": [1631, 30, 7, 116, 7, 117,1631],
  "29-M": [1267, 28, 21, 45, 7, 46,1267],
  "29-Q": [911, 30, 1, 23, 37, 24,911],
  "29-H": [701, 30, 19, 15, 26, 16, 701],

  "30-L": [1735, 30, 5, 115, 10, 116, 1735],
  "30-M": [1373, 28, 19, 47, 10, 48, 1373],
  "30-Q": [985, 30, 15, 24, 25, 25, 985],
  "30-H": [745, 30, 23, 15, 25, 16, 745],

  "31-L": [1843, 30, 13, 115, 3, 116, 1843],
  "31-M": [1455, 28, 2, 46, 29, 47,1455],
  "31-Q": [1033, 30, 42, 24, 1, 25,1033],
  "31-H": [793, 30, 23, 15, 28, 16,793],

  "32-L": [1955, 30, 17, 115,1955],
  "32-M": [1541, 28, 10, 46, 23, 47,1541],
  "32-Q": [1115, 30, 10, 24, 35, 25,1115],
  "32-H": [845, 30, 19, 15, 35, 16,845],

  "33-L": [2071, 30, 17, 115, 1, 116,2071],
  "33-M": [1631, 28, 14, 46, 21, 47,1631],
  "33-Q": [171, 30, 29, 24, 19, 25,1171],
  "33-H": [901, 30, 11, 15, 46, 16,901],

  "34-L": [2191, 30, 13, 115, 6, 116, 2191],
  "34-M": [1725, 28, 14, 46, 23, 47, 1725],
  "34-Q": [1231, 30, 44, 24, 7, 25,1231],
  "34-H": [961, 30, 59, 16, 1, 17,961],

  "35-L": [2306, 30, 12, 121, 7, 122,2306],
  "35-M": [1812, 28, 12, 47, 26, 48,1812],
  "35-Q": [1286, 30, 39, 24, 14, 25,1286],
  "35-H": [986, 30, 22, 15, 41, 16,986],

  "36-L": [2434, 30, 6, 121, 14, 122,2434],
  "36-M": [1914, 28, 6, 47, 34, 48,1914],
  "36-Q": [1354, 30, 46, 24, 10, 25,1354],
  "36-H": [1054, 30, 2, 15, 64, 16,1054],

  "37-L": [2566, 30, 17, 122, 4, 123,2566],
  "37-M": [1992, 28, 29, 46, 14, 47,1992],
  "37-Q": [1426, 30, 49, 24, 10, 25,1426],
  "37-H": [1096, 30, 24, 15, 46, 16,1096],

  "38-L": [2702, 30, 4, 122, 18, 123,2702],
  "38-M": [2102, 28, 13, 46, 32, 47, 2102],
  "38-Q": [1502, 30, 48, 24, 14, 25, 1502],
  "38-H": [1142, 30, 42, 15, 32, 16, 1142],

  "39-L": [2812, 30, 20, 117, 4, 118, 2812],
  "39-M": [2216, 28, 40, 47, 7, 48, 2216],
  "39-Q": [1582, 30, 43, 24, 22, 25, 1582],
  "39-H": [1222, 30, 10, 15, 67, 16, 1222],

  "40-L": [2956, 30, 19, 118, 6, 119, 2956],
  "40-M": [2334, 28, 18, 47, 31, 48, 2334],
  "40-Q": [1666, 30, 34, 24, 34, 25,1666],
  "40-H": [1276, 30, 20, 15, 61, 16, 1276],

}

export const alphaToInt = [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116
  , 232
  , 205
  , 135
  , 19
  , 38
  , 76
  , 152
  , 45
  , 90
  , 180
  , 117
  , 234
  , 201
  , 143
  , 3
  , 6,
  12,
  24,
  48,
  96,
  192,
  157,
  39,
  78,
  156,
  37,
  74,
  148,
  53,
  106,
  212,
  181,
  119,
  238,
  193,
  159,
  35,
  70,
  140,
  5,
  10,
  20,
  40,
  80,
  160,
  93,
  186,
  105,
  210,
  185,
  111,
  222,
  161,
  95,
  190,
  97,
  194,
  153,
  47,
  94,
  188,
  101,
  202,
  137,
  15,
  30,
  60,
  120,
  240,
  253,
  231,
  211,
  187,
  107,
  214,
  177,
  127,
  254,
  225,
  223,
  163,
  91,
  182,
  113,
  226,
  217,
  175,
  67,
  134,
  17,
  34,
  68,
  136,
  13,
  26,
  52,
  104,
  208,
  189,
  103,
  206,
  129,
  31,
  62,
  124,
  248,
  237,
  199,
  147,
  59,
  118,
  236,
  197,
  151,
  51,
  102,
  204,
  133,
  23,
  46,
  92,
  184,
  109,
  218,
  169,
  79,
  158,
  33,
  66,
  132,
  21,
  42,
  84,
  168,
  77,
  154,
  41,
  82,
  164,
  85,
  170,
  73,
  146,
  57,
  114,
  228,
  213,
  183,
  115,
  230,
  209,
  191,
  99,
  198,
  145,
  63,
  126,
  252,
  229,
  215,
  179,
  123,
  246,
  241,
  255,
  227,
  219,
  171,
  75,
  150,
  49,
  98,
  196,
  149,
  55,
  110,
  220,
  165,
  87,
  174,
  65,
  130,
  25,
  50,
  100,
  200,
  141,
  7,
  14,
  28,
  56,
  112,
  224
  , 221
  , 167
  , 83
  , 166
  , 81
  , 162
  , 89
  , 178
  , 121
  , 242
  , 249
  , 239
  , 195
  , 155
  , 43
  , 86
  , 172
  , 69
  , 138
  , 9
  , 18
  , 36
  , 72
  , 144
  , 61
  , 122
  , 244
  , 245
  , 247
  , 243
  , 251
  , 235
  , 203
  , 139
  , 11
  , 22
  , 44
  , 88
  , 176
  , 125
  , 250
  , 233
  , 207
  , 131
  , 27
  , 54
  , 108
  , 216
  , 173
  , 71
  , 142
  , 1]

  export const intToAlpha = [-1,
    0,
    1,
    25,
    2,
    50,
    26,
    198,
    3,
    223,
    51,
    238,
    27,
    104,
    199,
    75,
    4,
    100,
    224,
    14,
    52,
    141,
    239,
    129,
    28,
    193,
    105,
    248,
    200,
    8,
    76,
    113,
    5,
    138,
    101,
    47,
    225,
    36,
    15,
    33,
    53,
    147,
    142,
    218,
    240,
    18,
    130,
    69,
    29,
    181,
    194,
    125,
    106,
    39,
    249,
    185,
    201,
    154,
    9,
    120,
    77,
    228,
    114,
    166,
    6,
    191,
    139,
    98,
    102,
    221,
    48,
    253,
    226,
    152,
    37,
    179,
    16,
    145,
    34,
    136,
    54,
    208,
    148,
    206,
    143,
    150,
    219,
    189,
    241,
    210,
    19,
    92,
    131,
    56,
    70,
    64,
    30,
    66,
    182,
    163,
    195,
    72,
    126,
    110,
    107,
    58,
    40,
    84,
    250,
    133,
    186,
    61,
    202,
    94,
    155,
    159,
    10,
    21,
    121,
    43,
    78,
    212,
    229,
    172,
    115,
    243,
    167,
    87,
    7,
    112,
    192,
    247,
    140,
    128,
    99,
    13,
    103,
    74,
    222,
    237,
    49,
    197,
    254,
    24,
    227,
    165,
    153,
    119,
    38,
    184,
    180,
    124,
    17,
    68,
    146,
    217,
    35,
    32,
    137,
    46,
    55,
    63,
    209,
    91,
    149,
    188,
    207,
    205,
    144,
    135,
    151,
    178,
    220,
    252,
    190,
    97,
    242,
    86,
    211,
    171,
    20,
    42,
    93,
    158,
    132,
    60,
    57,
    83,
    71,
    109,
    65,
    162,
    31,
    45,
    67,
    216,
    183,
    123,
    164,
    118,
    196,
    23,
    73,
    236,
    127,
    12,
    111,
    246,
    108,
    161,
    59,
    82,
    41,
    157,
    85,
    170,
    251,
    96,
    134,
    177,
    187,
    204,
    62,
    90,
    203,
    89,
    95,
    176,
    156,
    169,
    160,
    81,
    11,
    245,
    22,
    235,
    122,
    117,
    44,
    215,
    79,
    174,
    213,
    233,
    230,
    231,
    173,
    232,
    116,
    214,
    244,
    234,
    168,
    80,
    88,
    175
  ]