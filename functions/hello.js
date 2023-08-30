exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Skye',
      age: 85,
      email: 'hkim7095@gmail.com'
    })
  }
}