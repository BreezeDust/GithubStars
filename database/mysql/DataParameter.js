/**
 * Created by BreezeDust on 16/2/22.
 * sql参数化类
 */
var mysql = require('mysql');
function DataParameter(sqlStr){
    this.sqlArray=[]; // sql按照%s分割后的数组
    this.valueArray=[]; // 值数组
    this.index = 0; // bind参数时的游标
    this.valueCount=0; // sql语句传入进来时,真实的参数个数
    this.sql="";
    this.__construct(sqlStr);
    return this;
}

DataParameter.NUMBER = "number";
DataParameter.STRING = "string";
DataParameter.BOOL = "boolean";

DataParameter.prototype.__construct=function(sqlStr){
    this.sqlArray=sqlStr.split("%s");
    this.valueCount=this.sqlArray.length-1;
};
DataParameter.prototype.bind=function(value,type){
    if(typeof (value)==type){
        this.valueArray[this.index++]=value;
        return;
    }
    if(!this.checkHasTheType(type)){
        console.log("ERROR: DataParamenter without type of "+type);
    }
    else{
        console.log("ERROR: value ["+value+"] is not type ["+type+"]");
    }
};
DataParameter.prototype.checkHasTheType=function(type){
    if(type==DataParameter.NUMBER
        || type==DataParameter.STRING
        || type==DataParameter.BOOL){
        return true;
    }
    return false;
};
DataParameter.prototype.getSql=function(){
    if (this.index == this.valueCount) {
        if(this.sql==null || this.sql==""){
            this._createSqlStr();
        }
        return this.sql;
    }
    console.log("ERROR: the parame is "+this.valueCount+", you have "+this.index);
    return "";
};
DataParameter.prototype._createSqlStr=function(){
    this.sql=this.sqlArray[0];
    var count=1;
    for(var i=0;i<this.valueCount;i++){
        var value=this.valueArray[i];
        if(typeof (value)==DataParameter.STRING){
            value=mysql.escape(value);
        }
        this.sql=this.sql+value+" "+this.sqlArray[count++];
    }
};

module.exports=DataParameter;