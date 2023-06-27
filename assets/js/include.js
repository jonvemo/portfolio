export const getHTML = (url, options) => {
    const XHR = new XMLHttpRequest();
    const { success, error } = options;

    XHR.addEventListener('readystatechange',e=>{
        if(XHR.readyState !==4) return
        if(XHR.status >= 200 && XHR.status < 300){
            const html = XHR.responseText
            success(html)
        } else {
            const message = XHR.statusText || 'Error'
            error(`Error ${XHR.status}: ${message}`)
        }
    })

    XHR.open('GET',url)
    XHR.setRequestHeader('Content-type','text/html; charset=utf-8')
    XHR.send()
}
  