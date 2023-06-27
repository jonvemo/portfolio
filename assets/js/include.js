export const getHTML = (options) => {
    const XHR = new XMLHttpRequest()
    let {url,success,error} = options  

    XHR.addEventListener('readystatechange',e=>{
        if(XHR.readyState !==4) return
        if(XHR.status >= 200 && XHR.status < 300){
            let html = XHR.responseText
            success(html)
        } else {
            let html = XHR.responseText
            // let message = XHR.statusText || 'Error'
            // error(`Error ${XHR.status}: ${message}`)
            error(html)
        }
    })

    XHR.open('GET',url)
    XHR.setRequestHeader('Content-type','text/html; charset=utf-8')
    XHR.send()
}