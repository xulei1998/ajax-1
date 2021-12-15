let n=1
getPage.onclick=()=>{
  const request=new XMLHttpRequest()
  request.open('GET',`/page${n+1}.json`)
  request.onreadystatechange=()=>{
    if(request.readyState===4 &&request.status===200){
      const array=JSON.parse(request.response)  //把json的字符串变成数组
      array.forEach(item => {
        const li=document.createElement('li')
        li.textContent=item.id
        xxx.appendChild(li);
      });
      n=n+1
    }
  }
  request.send()
}
getJSON.onclick=()=>{
  const request=new XMLHttpRequest()
  request.open('GET','/5.json')
  request.onreadystatechange=()=>{
    if(request.readyState===4 &&request.status===200){
      const object=JSON.parse(request.response);  //把一个符合json语法的字符串变成json对象
      myName.textContent=object.name
    }
  }
  request.send()
}
getXML.onclick=()=>{
  const request=new XMLHttpRequest()
  request.open('GET','/4.xml')
  request.onreadystatechange=()=>{
    if(request.readyState===4 &&request.status===200){
      const dom=request.responseXML;
      const text=dom.getElementsByTagName('warning')[0].textContent
      console.log(text.trim())  //读出warning标签里面的内容
    }
  }
  request.send()
}
getHTML.onclick=()=>{
  const request=new XMLHttpRequest()
  request.open('GET','/3.html')
  request.onload=()=>{
    //console.log(request.response)  //这里面就是你写在3.html里的内容
    const div=document.createElement('div')  //创建div标签
    div.innerHTML=request.response  //写入3.html内容
    document.body.appendChild(div)  //把它加入到body里
    //console.log('成功了')
  }
  request.onerror=()=>{
    console.log('失败了')
  }
  request.send()
}
getJS.onclick=()=>{
  const request=new XMLHttpRequest()
  request.open('GET','/2.js')
  request.onload=()=>{
    //console.log(request.response)  //这里面就是你写在2.js里的内容
    const script=document.createElement('script')  //创建script标签
    script.innerHTML=request.response  //写入2.js内容
    document.body.appendChild(script)  //把script加入到body里
    //console.log('成功了')
  }
  request.onerror=()=>{
    console.log('失败了')
  }
  request.send()
}

getCSS.onclick=()=>{
  const request=new XMLHttpRequest()
  request.open('GET','/style.css')  //readyStates ===1
  request.onreadystatechange=()=>{
    if(request.readyState===4){
      //console.log('下载完成，但不知道是2xx 还是4xx  5xx')
      if(request.status>=200&&request.status<300){
        const style=document.createElement('style')  //创建一个style标签
        style.innerHTML=request.response  //填写style内容
        document.head.appendChild(style)   //将style标签插到head里面
      }else {
        alert('加载CSS失败')   //弹出对话框
      }
    }
  }
  /*
  request.onload=()=>{
    //console.log(request.response)  //这里面就是你写的style.css的内容
    const style=document.createElement('style')  //创建一个style标签
    style.innerHTML=request.response  //填写style内容
    document.head.appendChild(style)   //将style标签插到head里面

    //console.log('成功了')
  }
  request.onerror=()=>{
    console.log('失败了')
  }
  */
  request.send() // //readyStates ===2
}
