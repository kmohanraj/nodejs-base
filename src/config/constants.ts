export default {
  CONFIG: {
    PORT: '5000',
    JSON_FILE_LIMIT: '50mb'
  },
  ENVIRONMENTS: {
    DEV: 'dev',
    PROD: 'prod',
    TEST: 'test'
  },
  ROLE_ID: {
    SUPER_ADMIN: 'Super Admin',
    SUPER_ID: 1,
    ORG_ADMIN: 'Org Admin',
    ORG_ID: 2,
    ADMIN: 'Admin',
    ADMIN_ID: 3,
    EMPLOYEE: 'EMPLOYEE',
    EMPLOYEE_ID: 4
  },
  STATUS_CODE: {
    STATUS_200: 200,
    STATUS_204: 204,
    STATUS_400: 400,
    STATUS_401: 401,
    STATUS_403: 403,
    STATUS_409: 409,
    STATUS_500: 500,
    STATUS_404: 404
  },
  AUTHORIZATION_RESPONSES: {
    USER_NOT_FOUND: 'User Not Found',
    TOKEN_NOT_FOUND: 'Token Not Found'
  },
  MESSAGES: {
    SUCCESS: {
      USER: {
        USER_CREATE: 'User added successfully',
        USER_UPDATE: 'User record Updated',
        USER_DELETE: 'User record removed'
      }
    },
    ERROR: {
      TOKEN_KEY: {
        CREATE: 'Error while creating the tokenKey',
        UPDATE: 'Error while updating the tokenKey',
        DELETE: 'Error while deleting the tokenKey',
        GET: 'Error while get the tokenKey',
        ALL: 'Error while retrieving the all tokenKey'
      },
      ROLE: {
        ROLE_GET: 'Error while getting role record',
        GET_ALL: 'Unable to get the role'
      },
      USER: {
        USER_ALREADY_EXISTS: 'User record already found',
        USER_UPDATE: 'Unable to update user record',
        USER_DELETE: 'Unable to delete user record',
        FIND_BY_ID: 'Unable to find the user',
        USER_FETCH_ALL: 'Unable to retrieve user records',
        USER_GET_USER: 'Unable to get user',
        USER_INVALID: 'Invalid userId Parameter',
        USER_CREATE: 'Unable to create user',
        USER_PASSWORD_NOT_MATCH: 'Passwords does not Match',
        INVALID_OLD_PASSWORD: 'Old password is invalid',
        USER_LOGIN: 'Unable to Login',
        USER_NOT_FOUND: 'User record not found',
        INVALID_FIRST_LOGIN:
          'Invalid first login attempt, User already resetted the password',
        USER_INACTIVE: 'Please contact you organization',
        ALL: 'Unable to retrieve the users'
      }
    }
  },
  UTILS: {
    REFRESH_TOKEN_EXPIRED: 'REFRESH_TOKEN_EXPIRED',
    REFRESH_ACCESS_TOKEN: 'UNABLE TO REFRESH ACCESS TOKEN',
    REFRESH_TOKEN: 'Unable to refresh access token',
    UNABLE_TO_GENERATE_TOKEN: 'Unable to Generate Token'
  },
  PRISMA: {
    PRIMARY: 'P2002'
  }
};
