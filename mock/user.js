
const tokens = {
  admin: {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOi8vYXBpLnl3aHViLmNvbS9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTU1NDIwMjg5NSwiZXhwIjoxNTU1NDEyNDk1LCJuYmYiOjE1NTQyMDI4OTUsImp0aSI6IkhwREhEUFJTTUhvOVdIeDcifQ.YVCeAJJaZDLUlk7MpcT0TjlRhwS0HE3oCYiUfxJ1Ws8'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        code: 20000,
        data: tokens[username]
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      return {
        code: 20000,
        data: users[token]
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
