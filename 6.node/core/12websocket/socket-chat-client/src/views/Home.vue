<template>
  <!-- 消息列表 -->
  <ul id="messages">
    <li>xxx说：hello</li>
    <li>xxx说：world</li>
    <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
  </ul>

  <!-- 发送消息得表单 -->
  <form id="form" @submit.prevent="sendMessage">
    <input v-model="inputMessage" id="input" autocomplete="off" />
    <button>Send</button>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { io } from 'socket.io-client'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const inputMessage = ref('')
    const messages = ref([])
    const store = useStore()

    const socket = io('http://localhost:3000/', {
      reconnectionDelayMax: 10000, // 重新连接的延迟时间
      auth: { // 传递身份信息
        token: store.state.user.token
      },
      query: { // 自定义请求查询参数
        'my-key': 'my-value'
      },
      // 添加添加头
      extraHeaders: {}
    })
    socket.on('connect', () => {
      console.log('连接建立成功')
    })

    socket.on('disconnect', () => {
      console.log('连接断开')
    })

    socket.on('connect_error', err => {
      console.log('连接失败', err)
    })

    socket.on('chat message', message => {
      messages.value.push(message)
    })

    const sendMessage = () => {
      if (inputMessage.value) {
        socket.emit('chat message', inputMessage.value)
        inputMessage.value = ''
      }
    }
    return {
      sendMessage,
      inputMessage,
      messages
    }
  }
})
</script>

<style>
body {
  margin: 0;
  padding-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

#form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}

#input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}

#input:focus {
  outline: none;
}

#form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#messages > li {
  padding: 0.5rem 1rem;
}

#messages > li:nth-child(odd) {
  background: #efefef;
}
</style>
