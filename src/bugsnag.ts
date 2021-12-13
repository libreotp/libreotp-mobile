import Bugsnag from '@bugsnag/react-native';

const bugsnag = Bugsnag.start({
  logger: null,
});

export default bugsnag;
