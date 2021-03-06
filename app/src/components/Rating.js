import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import R from '../R';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating ? this.props.rating : 0,
      max: this.props.max ? this.props.max : 5,
      iconWidth: this.props.iconWidth ? this.props.iconWidth : 36,
      iconHeight: this.props.iconHeight ? this.props.iconHeight : 36,
      iconSelected: this.props.iconSelected
        ? this.props.iconSelected
        : R.images.star_check,
      iconUnselected: this.props.iconUnselected
        ? this.props.iconUnselected
        : R.images.star_unchek,
      editable: this.props.editable != null ? this.props.editable : true
    };
  }

  onRate(rating) {
    this.setState({ rating });
    if (this.props.onRate) {
      this.props.onRate(rating);
    }
    this.props.callbackFromParent(rating);
  }

  render() {
    console.log(this.state.rating);

    var icons = [];
    for (let i = 1; i <= this.state.max; i++) {
      icons.push(
        <TouchableWithoutFeedback
          disabled={!this.state.editable}
          key={i}
          style={{ height: this.state.iconHeight, width: this.state.iconWidth }}
          onPress={() => this.onRate(i)}
        >
          <Image
            style={{
              height: this.state.iconHeight,
              width: this.state.iconWidth,
              margin: 10
            }}
            source={
              this.state.rating >= i
                ? this.state.iconSelected
                : this.state.iconUnselected
            }
          />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View style={[this.props.style, { flexDirection: 'row' }]}>{icons}</View>
    );
  }
}

export { Rating };
