var http = require('http')
var fs = require('fs')
var url = require('url')
const { mainModule } = require('process')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有人发送请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/index.html'){
    response.statusCode = 200  //如果是已知路径 返回状态码200
    response.setHeader('Content-Type', 'text/html;charset=utf-8') //指定内容的类型
    let string=fs.readFileSync('public/index.html').toString()
    const page1=fs.readFileSync('db/page1.json').toString()
    const array=JSON.parse(page1)  //把这个string转换成对象
    const result=array.map(item=>`<li>${item.id}</li>`).join('')
    string=string.replace('{{page1}}',`<ul id="xxx">${result}</ul>`)

    response.write(string)   //想要返回客户端的内容
    response.end()  //响应发送给浏览器，结束
  } else if(path === '/style.css'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(fs.readFileSync('public/style.css'))
    response.end()
  } else if(path === '/main.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('public/main.js'))
    response.end()
  } else if(path === '/2.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('public/2.js'))
    response.end()
  } else if(path === '/3.html'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(fs.readFileSync('public/3.html'))
    response.end()
  } else if(path === '/4.xml'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/xml;charset=utf-8')
    response.write(fs.readFileSync('public/4.xml'))
    response.end()
  } else if(path === '/5.json'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.write(fs.readFileSync('public/5.json'))
    response.end()
  } else if(path === '/page2.json'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.write(fs.readFileSync('db/page2.json'))
    response.end()
  } else if(path === '/page3.json'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.write(fs.readFileSync('db/page3.json'))
    response.end()
  } else{
    response.statusCode = 404   //未知的路径
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你访问的页面不存在\n`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n，请用curl命令或者Chrome浏览器里打开 http://localhost:' + port)

