import { v4 as uuid } from 'uuid';

const sessionSave = (session: string) => {
  console.info('sessionSave: ', session);
};
const sessionGet = ({ isSave = false }) => {
  const endTime = Date.now() + 1000 * 60 * 60 * 24;
  const session = `${endTime}-${uuid()}`;
  if (isSave) {
    setTimeout(() => sessionSave(session), 10);
  }
  return session;
};
const sessionIsValid = (sessionId: string): boolean => {
  const [endTime] = sessionId.split('-');
  const time = +endTime - Date.now();
  return time >= 0;
};

export const session = {
  get: sessionGet,
  isValid: sessionIsValid,
};
