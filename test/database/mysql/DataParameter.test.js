/**
 * Created by BreezeDust on 16/2/25.
 */
var patch=require('path');
global.APP_PATCH=patch.resolve(__dirname,"../../../");
/********************************/
var DataParameter = require(APP_PATCH+"/database/mysql/DataParameter");
var assert = require('assert');
describe('--->DataParameter', function () {
    it('#normal',function(){
        var sql=new DataParameter("SELECT * FROM table WHERE a=%s AND b=%s AND c=%s AND b=%s");
        sql.bind(1,DataParameter.NUMBER);
        sql.bind(1.234,DataParameter.NUMBER);
        sql.bind(false,DataParameter.BOOL);
        sql.bind("abcdf",DataParameter.STRING);
        assert.equal("SELECT * FROM table WHERE a=1 AND b=1.234 AND c=false AND b='abcdf'",sql.getSql());
    });
    it('#error not NUMBER',function(){
        var sql=new DataParameter("SELECT * FROM table WHERE a=%s AND b=%s AND c=%s AND b=%s");
        sql.bind(1,DataParameter.NUMBER);
        sql.bind("1.234",DataParameter.NUMBER);
        sql.bind(false,DataParameter.BOOL);
        sql.bind("abcdf",DataParameter.STRING);
        assert.equal("",sql.getSql());
    });
    it('#error not BOOL',function(){
        var sql=new DataParameter("SELECT * FROM table WHERE a=%s AND b=%s AND c=%s AND b=%s");
        sql.bind(1,DataParameter.NUMBER);
        sql.bind(1.234,DataParameter.NUMBER);
        sql.bind("false",DataParameter.BOOL);
        sql.bind("abcdf",DataParameter.STRING);
        assert.equal("",sql.getSql());
    });
    it('#error not STRING',function(){
        var sql=new DataParameter("SELECT * FROM table WHERE a=%s AND b=%s AND c=%s AND b=%s");
        sql.bind(1,DataParameter.NUMBER);
        sql.bind(1.234,DataParameter.NUMBER);
        sql.bind(false,DataParameter.BOOL);
        sql.bind(10,DataParameter.STRING);
        assert.equal("",sql.getSql());
    });
    it('#error simple sql Injection Attacks',function(){
        var sql=new DataParameter("SELECT * FROM table WHERE a=%s AND b=%s AND c=%s AND b=%s");
        sql.bind(1,DataParameter.NUMBER);
        sql.bind(1.234,DataParameter.NUMBER);
        sql.bind(false,DataParameter.BOOL);
        sql.bind("' a=100",DataParameter.STRING);
        assert.equal("SELECT * FROM table WHERE a=1 AND b=1.234 AND c=false AND b='\\' a=100'",sql.getSql());
    });
});