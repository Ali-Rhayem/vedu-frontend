import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import authReducer from './authSlice/authSlice';
import userReducer from './userSlice/userSlice';
import coursesReducer from './coursesSlice/coursesSlice';
import assignmentsReducer from './assignmentsSlice/assignmentsSlice';
import classPeopleReducer from './classPeopleSlice';


const encryptor = encryptTransform({
  secretKey: process.env.REACT_APP_SECRET_KEY,
  onError: function(error) {
    console.error('Encryption error:', error);
  },
});

const userPersistConfig = {
  key: 'user',
  storage,
  transforms: [encryptor],
};

const peoplePersistConfig = {
  key: 'classPeople',
  storage,
  transforms: [encryptor],
};

const coursePersistConfig = {
  key: 'courses',
  storage,
  transforms: [encryptor],
};

const assignmentPersistConfig = {
  key: 'assignments',
  storage,
  transforms: [encryptor],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCourseReducer = persistReducer(coursePersistConfig, coursesReducer);
const persistedAssignmentReducer = persistReducer(assignmentPersistConfig, assignmentsReducer);
const persistedClassPeopleReducer = persistReducer(peoplePersistConfig, classPeopleReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: persistedUserReducer,
    courses: persistedCourseReducer,
    assignments: persistedAssignmentReducer,
    classPeople: persistedClassPeopleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['_persist'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
