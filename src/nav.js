import Taro from '@tarojs/taro'

const getOption = (url,data) =>{
  data = data || {}
  let opt = {
    type: 'navigateTo',
    url: ''
  }
  //查找协议
  let len = url.indexOf(':')
  if(len > -1){
    let type = url.substr(0,len)
    url = url.substr(len+1)
    if(type == 'redirect'){
      opt.type = 'redirectTo'
    }else if(type == 'switch'){
      opt.type = 'switchTab'
    }else if(type == 'back'){
      opt.delta = url || 1
      opt.type = 'navigateBack'
      return opt
    }else if(type == 'mini'){
      opt.type = 'navigateToMiniProgram'
    }
  }
  //查找参数
  len = url.indexOf('?')
  //参数长度
  let optionlen = len>-1?url.substr(len+1).length:0
  //插入参数
  let newoption = ''
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      newoption += (newoption?'&':'')+key+'='+data[key]
    }
  }
  url+=(optionlen>0?'&':'?')+newoption
  opt.url = encodeURI(url)
  return opt
}
/**
  跳转新页面传参写法
  nav('/pages/index/index')
  nav('/pages/index/index?id=1&nav=1')
  nav('/pages/index/index',{id:1,nav:1})
  nav('/pages/index/index?id=1&nav=1',{tab:1,bar:1})
  重定向写法
  nav('redirect:/pages/index/index')
  switchTab写法
  nav('switch:/pages/index/index')
  //关闭页面
  nav('back:')
  //关闭两层页面
  nav('back:2')
*/
export default (url,data) => {
  let opt = getOption(url,data)
  Taro[opt.type]({
    ...opt.type == 'navigateBack'?{delta: opt.delta}:{url: opt.url}
    
  })
}