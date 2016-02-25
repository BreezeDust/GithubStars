/**
 * Created by BreezeDust on 16/2/25.
 */
var DataParameter=require("../database/mysql/DataParameter");
var mysql=require("../database/mysql/mysql");

function add(jsonData,callBack){
    var data=new DataParameter("INSERT INTO `STARS` (userID,starReposID,starReposName,starReposUrl,starReposData,starTag) VALUES (%s,%s,%s,%s,%s)");
    data.bind(jsonData.userID,DataParameter.NUMBER);
    data.bind(jsonData.starReposID,DataParameter.NUMBER);
    data.bind(jsonData.starReposName,DataParameter.STRING);
    data.bind(jsonData.starReposUrl,DataParameter.STRING);
    data.bind(jsonData.starReposData,DataParameter.STRING);
    data.bind(jsonData.starTag,DataParameter.STRING);
    mysql.query(data.getSql(),callBack);
}
function setTagByStarID(jsonData,callBack){
    var data=new DataParameter("UPDATE `STARS` SET starTag=%s WHERE starID=%s");
    data.bind(jsonData.starTag,DataParameter.STRING);
    data.bind(jsonData.starID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function setTagByReposID(jsonData,callBack){
    var data=new DataParameter("UPDATE `STARS` SET starTag=%s WHERE starReposID=%s");
    data.bind(jsonData.starTag,DataParameter.STRING);
    data.bind(jsonData.starReposID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function getByTag(){
    var data=new DataParameter("SELECT * FROM `STARS` WHERE starTag=%s");
    data.bind(jsonData.starTag,DataParameter.STRING);
    mysql.query(data.getSql(),callBack);
}
exports.add=add;
exports.setTagByUserID=setTagByUserID;
