const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userId: state => state.user.userId,
  name: state => state.user.name,
  loginFlag: state => state.user.loginFlag,
  roles: state => state.user.roles
}
export default getters
