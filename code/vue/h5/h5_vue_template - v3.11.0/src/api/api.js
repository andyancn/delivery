import request from '@/utils/Request';
export function verifyCode(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/send_verify_code.do',
    method: 'get',
    params: params
  })
}


