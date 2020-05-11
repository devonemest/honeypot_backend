module.exports = function(data,cp){
    var text="";
for(var i=1; i <= Object.keys(data.text).length ; i++){
    text +=data.text[i] + " ";
}
cp.query(`INSERT INTO data VALUES(${data.hash[1]},${data.fcmid[1]},${data.yid[1]},${data.geo[1]},${data.geo[2]},'${text}');`, function(err, rows, fields) {
    if (err) throw err;
});

}



