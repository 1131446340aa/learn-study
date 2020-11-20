//时间转换
function ChangeDateFormat(val:number) {
    let str=""
     str=`${new Date(val).getFullYear()}年 ${new Date(val).getMonth()+1}月${new Date(val).getDay()}日`
    return str;
}

export default ChangeDateFormat