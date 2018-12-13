import axios from '@/servers/http'
import a from '@/components/test/test.a'
import './index.scss'
import { API } from '@/servers/api'
a()
console.log(API.test)
axios.get(API.test).then(res => {
  console.log(res)
})
