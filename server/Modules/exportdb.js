module.exports = function(data,cp){
    var text="";
for(var i=1; i <= Object.keys(data.text).length ; i++){
    text +=data.text[i] + " ";
}
var fcmid = "12";
var yid = "123";
cp.query(`INSERT INTO data VALUES(${data.hash[1]},${fcmid},${yid},${data.geo[1]},${data.geo[2]},'${text}');`, function(err, rows, fields) {
    if (err) throw err;
});

}



