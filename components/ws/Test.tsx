import { Box, Button, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('ws://localhost:3001')

const WSTest: FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [todoList, setToDoList] = useState<any[]>([])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
      socket.emit('todo:list', (res: any) => {
        setToDoList(res.data)
      })
    })

    socket.on('todo:created', (res: any) => {
      console.log(res)
      setToDoList([...todoList, res])
    })

    return () => {
      socket.off('connect')
      socket.off('todo:created')
    }
  }, [todoList])

  const sendToDo = () => {
    const payload: any = {
      completed: false,
      title: 'テストで固定値入れてます。'
    }
    socket.emit('todo:create', payload, (res: any) => {
      payload.id = res.data
      setToDoList([...todoList, payload])
    })
  }

  return (
    <Box>
      <Text mb={5}>websocket接続状況: {isConnected ? 'OK' : 'NG'}</Text>
      <Button onClick={sendToDo}>ToDo送信</Button>

      {todoList.map((todo) => (
        <Box p={2} border="1px solid black" key={todo.id}>
          {todo.id}
          <br />
          {todo.title}
        </Box>
      ))}
    </Box>
  )
}

export default WSTest
