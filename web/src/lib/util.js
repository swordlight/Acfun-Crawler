export function request (url, data, self, fn) {
    url='http://localhost:4000/'+url;
    if(!data.token){
        data.token=localStorage.getItem('token');
    };
    data=JSON.stringify(data);  //转为json
    let obj = new XMLHttpRequest();
    obj.open("POST", url, true);
    obj.setRequestHeader("Content-type","application/json;charset=utf-8"); // 发送信息至服务器时内容编码类型
    obj.onreadystatechange = function () {
        if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改                
            let responseText=JSON.parse(obj.responseText);
            console.log(responseText)
            if(responseText.state===10051){
                self.$message.error('token失效，请重新登录')
            }else if(responseText.state===10052){
                self.$message.error('token错误，请登录后再操作')
            }else{
                fn(responseText);
            }
        }
    };
    obj.send(data);
};

export function timetransform(timestamp){
    return new Date(timestamp).toLocaleString().replace(/\//g, "-");
}