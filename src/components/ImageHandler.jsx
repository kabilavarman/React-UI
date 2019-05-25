import React, { Component } from "react";
import _ from "lodash";
import RequestFactory from "../utility/requestFactory";
import { ls } from "../utility/LocalStorage";

class ImageHandler extends Component {
  state = { image: "", isFetching: false, imageUrl: "" };
  /**
   * dispatch action to get SubCategorylist data list
   */
  componentDidMount() {
    if (this.props.imageUrl) {
      // commented for future use
      this.getImage(this.props.imageUrl);
    }
  }

  getImage = imageName => {
    const authorizedUserDetails = JSON.parse(
      ls.getItem("authorizedUserDetails")
    );
    const type = this.props.type;
    if (
      imageName &&
      !imageName.includes(".") &&
      authorizedUserDetails[type] !== imageName
    ) {
      this.setState({ isFetching: true });
      const service = "BASE_API";
      RequestFactory.withService(service)
        .setHeaders("Accept", " image/png")
        .get(`deviceservice/images/` + imageName, response => {
          this.setState({
            image: URL.createObjectURL(response),
            isFetching: false
          });
        });
    }
    return false;
  };

  shouldComponentUpdate(nextprops) {
    if (this.props.imageUrl !== nextprops.imageUrl) {
      this.getImage(nextprops.imageUrl);
    }
    return true;
  }

  render() {
    const props = _.omit(this.props, "imageUrl");
    // render
    return this.state.isFetching ? (
      ""
    ) : (
      <img src={this.state.image} {...props} />
    );
  }
}

export default ImageHandler;
