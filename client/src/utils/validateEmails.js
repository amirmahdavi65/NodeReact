const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidList = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => !/^\s*$/.test(email) && !re.test(email));

  if (invalidList.length) {
    return `These emails are invalid: ${invalidList}`;
  }

  return '';
};
