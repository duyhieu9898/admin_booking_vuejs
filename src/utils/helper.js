import config from '@/constants/config'

export function asset (fileName) {
  return `${config.SERVER_ADDRESS}${fileName[0] === '/' ? '' : '/'}${fileName}`
}
