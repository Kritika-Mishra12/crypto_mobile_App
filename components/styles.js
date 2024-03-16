import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  option: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'black',
    margin: 5,
  },
  selected: {
    backgroundColor: '#FF4500',
    margin: 6,
    padding: 10,
    borderRadius: 10,
  },
});
export default styles;