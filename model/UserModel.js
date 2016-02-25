/**
 * Created by BreezeDust on 16/2/25.
 */
var DataParameter=require("../database/mysql/DataParameter");
var mysql=require("../database/mysql/mysql");

function add(jsonData,callBack){
    var data=new DataParameter("INSERT INTO `USERS` (githubToken,userName,userEmail,userIco) VALUES (%s,%s,%s,%s)");
    data.bind(jsonData.githubToken,DataParameter.STRING);
    data.bind(jsonData.userName,DataParameter.STRING);
    data.bind(jsonData.userEmail,DataParameter.STRING);
    data.bind(jsonData.userIco,DataParameter.STRING);
    mysql.query(data.getSql(),callBack);
}
function updateByUserID(jsonData,callBack){
    var data=new DataParameter("UPDATE `USERS` SET githubToken=%s,userName=%s,userEmail=%s,userIco=%s WHERE userID=%s");
    data.bind(jsonData.githubToken,DataParameter.STRING);
    data.bind(jsonData.userName,DataParameter.STRING);
    data.bind(jsonData.userEmail,DataParameter.STRING);
    data.bind(jsonData.userIco,DataParameter.STRING);
    data.bind(jsonData.userID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function setGitHubTokenByUserID(jsonData,callBack){
    var data=new DataParameter("UPDATE `USERS` SET githubToken=%s WHERE userID=%s");
    data.bind(jsonData.githubToken,DataParameter.STRING);
    data.bind(jsonData.userID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function setUserInfoByGithubToken(jsonData,callBack){
    var data=new DataParameter("UPDATE `USERS` SET userName=%s,userEmail=%s,userIco=%s WHERE githubToken=%s");
    data.bind(jsonData.githubToken,DataParameter.STRING);
    data.bind(jsonData.userName,DataParameter.STRING);
    data.bind(jsonData.userEmail,DataParameter.STRING);
    data.bind(jsonData.userIco,DataParameter.STRING);
    data.bind(jsonData.userID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function getByUserID(){
    var data=new DataParameter("SELECT * FROM `USERS` WHERE userID=%s");
    data.bind(jsonData.userID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function getByGithubToken(){
    var data=new DataParameter("SELECT * FROM `USERS` WHERE githubToken=%s");
    data.bind(jsonData.githubToken,DataParameter.STRING);
    mysql.query(data.getSql(),callBack);
}
exports.add=add;
exports.updateByUserID=updateByUserID;
exports.setGitHubTokenByUserID=setGitHubTokenByUserID;
exports.setUserInfoByGithubToken=setUserInfoByGithubToken;
exports.getByUserID=getByUserID;
exports.getByGithubToken=getByGithubToken;


