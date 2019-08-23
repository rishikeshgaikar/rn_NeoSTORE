import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import R from '../R';

const DEVICE_WIDTH = Dimensions.get('window').width;

class ImageCarousel extends Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState(
        prev => ({
          selectedIndex: prev.selectedIndex + 1
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            x: DEVICE_WIDTH * this.state.selectedIndex,
            y: 0
          });
        }
      ),
        this.makeZero();
    }, 3000);
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  makeZero() {
    if (this.state.selectedIndex === this.props.image.length) {
      this.setState({ selectedIndex: 0 });
      this.scrollRef.current.scrollTo({
        animated: true,
        x: DEVICE_WIDTH * 0,
        y: 0
      });
    }
  }

  render() {
    const images = this.props.image;
    const il = this.props.image.length - 1;
    const { selectedIndex } = this.state;

    return (
      <View style={{ height: '100%', width: '100%' }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
        >
          {images.map(image => (
            <Image
              style={styles.backgroundImage}
              source={image.key}
              key={image.key}
            />
          ))}
        </ScrollView>
        <View style={styles.circleDiv}>
          {images.map((image, i) => (
            <View
              style={[
                styles.whiteCircle,
                { opacity: i === selectedIndex ? 1 : 0.3 }
              ]}
              key={image.key}
              active={i === selectedIndex}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: Dimensions.get('window').width
  },
  circleDiv: {
    position: 'absolute',
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: R.colors.r2
  }
});

export { ImageCarousel };
