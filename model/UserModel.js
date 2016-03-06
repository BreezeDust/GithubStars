/**
 * Created by BreezeDust on 16/2/25.
 */
var DataParameter=require(APP_PATCH+"/database/mysql/DataParameter");
var mysql=require(APP_PATCH+"/database/mysql/mysql");

function add(jsonData,callBack){
    var data=new DataParameter("INSERT INTO `USERS` (githubID,githubToken,tokenPassword,userName,userEmail,userIco) VALUES (%s,%s,%s,%s,%s,%s)");
    data.bind(jsonData.githubID,DataParameter.NUMBER);
    data.bind(jsonData.githubToken,DataParameter.STRING);
    data.bind(jsonData.tokenPassword,DataParameter.STRING);
    data.bind(jsonData.userName,DataParameter.STRING);
    data.bind(jsonData.userEmail,DataParameter.STRING);
    data.bind(jsonData.userIco,DataParameter.STRING);
    mysql.query(data.getSql(),callBack);
}
function updateByUserID(jsonData,callBack){
    var data=new DataParameter("UPDATE `USERS` SET githubID=%s,githubToken=%s,tokenPassword=%s,userName=%s,userEmail=%s,userIco=%s WHERE userID=%s");
    data.bind(jsonData.githubID,DataParameter.NUMBER);
    data.bind(jsonData.githubToken,DataParameter.STRING);
    data.bind(jsonData.tokenPassword,DataParameter.STRING);
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
function setGitHubTokenByGithubID(jsonData,callBack){
    var data=new DataParameter("UPDATE `USERS` SET githubToken=%s WHERE githubID=%s");
    data.bind(jsonData.githubToken,DataParameter.STRING);
    data.bind(jsonData.githubID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function getByUserID(userID,callBack){
    var data=new DataParameter("SELECT * FROM `USERS` WHERE userID=%s");
    data.bind(userID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function getByGithubID(githubID,callBack){
    var data=new DataParameter("SELECT * FROM `USERS` WHERE githubID=%s");
    data.bind(githubID,DataParameter.NUMBER);
    mysql.query(data.getSql(),callBack);
}
function getByGithubToken(githubToken,callBack){
    var data=new DataParameter("SELECT * FROM `USERS` WHERE githubToken=%s");
    data.bind(githubToken,DataParameter.STRING);
    mysql.query(data.getSql(),callBack);
}
exports.add=add;
exports.updateByUserID=updateByUserID;
exports.setGitHubTokenByUserID=setGitHubTokenByUserID;
exports.getByUserID=getByUserID;
exports.getByGithubID=getByGithubID;
exports.getByGithubToken=getByGithubToken;


