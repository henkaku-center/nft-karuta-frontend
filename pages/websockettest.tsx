import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const WebSocketTest: NextPage = () => {
  const WSTest = dynamic(() => import('../components/ws/Test'), { ssr: false })

  return <WSTest />
}

export default WebSocketTest
