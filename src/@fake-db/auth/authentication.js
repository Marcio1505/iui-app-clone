import jwt from 'jsonwebtoken';
import mock from '../mock';

const users = [
  {
    id: 1,
    email: 'demo@demo.com',
    password: 'demodemo',
    name: 'Demo',
  },
  {
    id: 2,
    email: 'admin@admin.com',
    password: 'adminadmin',
    name: 'Admin',
  },
  {
    id: 3,
    email: 'staff@staff.com',
    password: 'staff',
    name: 'Staff',
  },
];

const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  expireTime: 8000,
};

// POST: Check User Login Details and return user
mock.onPost('/api/authenticate/login/user').reply((request) => {
  const { email, password } = JSON.parse(request.data);
  let error = 'Something went wrong';

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    try {
      const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expireTime,
      });

      const userData = { ...user, loggedInWith: 'jwt' };

      delete userData.password;

      const response = {
        user: userData,
        accessToken,
      };

      return [200, response];
    } catch (e) {
      error = e;
    }
  } else {
    error = 'Email Or Password Invalid';
  }

  return [200, { error }];
});

mock.onPost('/api/authenticate/register/user').reply((request) => {
  if (request.data.length > 0) {
    const { email, password, name } = JSON.parse(request.data);
    const isEmailAlreadyInUse = users.find((user) => user.email === email);
    const error = {
      email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
      name: name === '' ? 'Please enter your name.' : null,
    };

    if (!error.name && !error.email) {
      const userData = {
        email,
        password,
        name,
      };

      // Add user id
      const { length } = users;
      let lastIndex = 0;
      if (length) {
        lastIndex = users[length - 1].id;
      }
      userData.id = lastIndex + 1;

      users.push(userData);

      const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expireTime,
      });

      const user = { ...userData };
      delete user.password;
      const response = { user, accessToken };

      return [200, response];
    }
    return [200, { error }];
  }
});

mock.onPost('/api/authenticate/refresh-token').reply((request) => {
  const { accessToken } = JSON.parse(request.data);

  try {
    const { id } = jwt.verify(accessToken, jwtConfig.secret);

    const userData = { ...users.find((user) => user.id === id) };

    const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    delete userData.password;
    const response = {
      userData,
      accessToken: newAccessToken,
    };

    return [200, response];
  } catch (e) {
    const error = 'Invalid access token';
    return [401, { error }];
  }
});
