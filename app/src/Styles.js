import { StyleSheet } from 'react-native';
import R from './R';

const style = StyleSheet.create({
  redContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: R.colors.r2
  },
  whiteText: {
    color: R.colors.b1,
    fontWeight: 'bold',
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: R.fonts.GothamBold
  }
});

export default style;
