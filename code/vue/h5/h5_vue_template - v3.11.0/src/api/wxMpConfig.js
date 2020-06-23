import request from '@/utils/Request';
export function WxMpConfig(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/api/sharing_page/sign/get.do',
    method: 'get',
    params: params
  })
}

