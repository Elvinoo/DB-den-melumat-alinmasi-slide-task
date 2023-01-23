const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "22Bb9061990",
    database: "slidetask",
    multipleStatements: true
});

connection.connect((err) => {
    if (!err) console.log('Connected to the db!')
})


//#region Birinci tapşırıq

//Cədvələ məlumat əlavə etmək üçün skript yazın
//fs modulu və JSON.parse vasitəsilə fayldan məlumatları yükləyin

//Deaktiv edirəm ki yeni fayllar yükləməsin
/* const fs = require('fs');
fs.readFile("./tasks.json", "utf-8", (err, data) => {
    if (err) {
        return console.log(err)
    }
    else {
        const newData = JSON.parse(data);
        newData.forEach(element => {
            connection.query(`INSERT INTO tasks SET ?`, element, (err, data) => {
                if (err) return console.log(err);
                console.log(data)
            })
        });
    }

}) */
//#endregion Birinci tapşırıq SON


//#region İkinci tapşırıq 


// 1-ci hissə

// yaradılmış layihədə, naməlum (IS NULL) təyin edilmiş bitmə tarixi olan bütün task-lar
//  üçün planlaşdırılan bitmə tarixini bu günə təyin edin.

connection.query(`UPDATE tasks SET due=curdate() WHERE finished IS NULL`, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
})



//2ci hissə
// Bütün icraçı olmayan task-ları “John” işçisinə təyin edin.
connection.query(`UPDATE tasks SET employee='John' WHERE employee IS NULL`, (err, data) => {
    if (err) return console.log(err);
    console.log(data)
})


//3cü hissə


//"John" işçisinin bütün task-lar üçün faktiki yerinə yetirmə tarixini,
// planlaşdırılan bitmə tarixi təyin edin.
connection.query(`UPDATE tasks SET finished=due  WHERE employee='John'`, (err, data) => {
    if (err) return console.log(err);
    console.log(data)
})
//#endregion İkinci tapşırıq SON


//#region Üçüncü tapşırıq


//Əvvəlki çalışmada yaradılmış layihədə 
//planlaşdırılan tarixdən sonra tamamlanmış bütün tapşırıqları silin
connection.query(`DELETE FROM tasks WHERE finished>due`, (err, data) => {
    if (err) return console.log(err);
    console.log(data)
})
//#endregion Üçüncü tapşırıq SON




app.listen(3000, () => {
    console.log('Connected to the server on the port 3000!')
})
