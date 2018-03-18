// export const locaUrl = 'http://120.25.240.196:3000/'
export const locaUrl = 'https://www.fuqihan.cn:3000/node/'
// export const locaUrl = 'http://localhost:3000/node/'

export function getCookie(cName) {
  if (document.cookie.length > 0) {
    let arr = document.cookie.split(';')
    for (let i = 0; i < arr.length; i++) {
      let cStart = arr[i].indexOf(cName + '=')
      if (cStart !== -1) return arr[i].split('=')[1]
    }
  }
  return ''
}
