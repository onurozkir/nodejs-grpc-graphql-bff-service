export default `
query findUsers {
  users {
    userNumber
    name
    email
    age
    password 
  }
}

mutation createUser {
  createUser(
    data: {
      name: "onur"
      age: 35
      password: "qweqwe"
      email: "qweqwe@qeqwe.com"
    }
  ) {
    errors {
      field
      message
    }
    user {
      userNumber
      name
      email
      age
    }
  }
}

`
