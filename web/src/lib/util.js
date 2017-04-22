export function request (url, data, fn) {
    url='http://localhost:4000/'+url;
    data=JSON.stringify(data);  //转为json
    let obj = new XMLHttpRequest();
    obj.open("POST", url, true);
    obj.setRequestHeader("Content-type","application/json;charset=utf-8"); // 发送信息至服务器时内容编码类型
    obj.onreadystatechange = function () {
        if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改                
            let responseText=JSON.parse(obj.responseText);
            fn(responseText);  //解析json
        }
    };
    obj.send(data);
};

export function timetransform(timestamp){
    return new Date(timestamp).toLocaleString().replace(/\//g, "-");
}