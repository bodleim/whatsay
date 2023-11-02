const express = require('express');
const app = express();
const path = require('path');
const port = 5400;
const http = require('http');
const querystring = require('querystring');

app.use(express.static('../Web/page'));
app.use(express.static('../Web/css'));
app.use(express.static('../Web/image'));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../Web/page/index.html');
    res.sendFile(filePath);
});

app.get('/showtexts', (req, res) => {
    const result_json = req.query.resultjson;
    const filePath = path.join(__dirname, '../Web/page/show_texts.html');
    console.log("인공지능 결과 : " + result_json);
    res.sendFile(filePath);
});

app.get('/input_send', (req, res) => {
    const inputText = req.query.text;

    console.log('입력 텍스트: ', inputText);

    // 다른 서버로 GET 요청을 보내기 위한 옵션 설정
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/predtext/?text=' + querystring.escape(inputText),
        method: 'GET'
    };

    // HTTP 요청 보내기
    const clientReq = http.request(options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            console.log('다른 서버로부터의 응답: ' + responseData);
            res.send(responseData);
        });
    });
    
    clientReq.end();
});



app.listen(port, '0.0.0.0', () => {
    console.log("server is open");
});