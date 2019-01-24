const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

const XLSX = path.join(__dirname, '年会.xlsx');
const xlsxData = xlsx.parse(fs.readFileSync(XLSX));
const xlsxPeoples = xlsxData[0].data; // 参会人员名单
const xlsxPrize = xlsxData[1].data; // 奖品数据
const xlsxOrder = xlsxData[2].data; // 抽奖轮次
var tempPeopleList = []; // 解析后的参会人员
var peopleList = []; // 解析后的参会人员
var prize = []; // 奖品对象
var lotteryOrder = []; // 抽奖顺序
const dictionary = {
  "奖品类型": 'type',
  "奖品名称": 'name',
  "奖品数量": 'quantity',
  "奖品图片地址": 'imgUrl'
}
for(let i = 0, l = xlsxPeoples.length; i < l; i++) {
  let department = xlsxPeoples[i];
  let departmentName = department[0]
  for (let a = 1, b = department.length; a < b; a++) {
    tempPeopleList.push({
      name: department[a],
      department: departmentName,
    })
  }
}

{
  let i = 0;
  let l = tempPeopleList.length;
  while (i < l) {
    let r = getRandomInt(0, (tempPeopleList.length-1));
    peopleList.push({ name, department, winner } = tempPeopleList[r])
    tempPeopleList.splice(r, 1);
    ++i;
  };
}

{
  const prizeTitle = xlsxPrize[0]
  for (let i = 1, l = xlsxPrize.length; i < l; i++) {
    let item = {
      'received': 0
    };
    for (let a = 0, b = xlsxPrize[i].length; a < b; a++) {
      item[dictionary[prizeTitle[a]]] = xlsxPrize[i][a]
    }
    Object.getOwnPropertyNames(item).length>1 && prize.push(item);
  }
  console.log(prize)
}

{
  for (let i = 1, l = xlsxOrder.length; i < l; i++) {
    lotteryOrder.push({
      type: xlsxOrder[i][0],
      num: xlsxOrder[i][1]
    })
  }
  console.log(lotteryOrder)
}

fs.writeFileSync(path.join(__dirname,'src/people.json'), JSON.stringify({data: peopleList}));
fs.writeFileSync(path.join(__dirname, 'src/prize.json'), JSON.stringify({ data: prize}));
fs.writeFileSync(path.join(__dirname, 'src/order.json'), JSON.stringify({ data: lotteryOrder}));
/**
 *生成指定范围内的随机数
 *
 * @author Fan
 * @date 2019-01-19
 * @param {*} min
 * @param {*} max
 * @returns
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};