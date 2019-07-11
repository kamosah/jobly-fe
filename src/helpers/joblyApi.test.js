import JoblyApi from './joblyApi';
const faker = require('faker');

/** POST /user - create user from data; return {
 *  username: username,
 *  password: password,
 *  first_name: first_name,
 *  last_name: last_name,
 *  email: email,
 *  photo_url: photo_url
 * } 
 **/

let userObj = {
  username: faker.name.findName(),
  first_name: faker.name.firstName(),
  password: faker.internet.password(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
};

describe('joblyApi', function() {
  it('Creates a new user', async (e) => {
    try {
      const { username, first_name, last_name, email } = userObj;
      let { token, newUser } = await JoblyApi.request('users', userObj, 'post');
      expect(token).toBeTruthy();
      expect(newUser.username).toBe(username);
      expect(newUser.first_name).toBe(first_name);
      expect(newUser.last_name).toBe(last_name);
      expect(newUser.email).toBe(email);
    } catch(e) {
      console.error(e);
    }
  });

});
