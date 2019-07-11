const strings = {
  api: {
    users: {
      register: "http://staging.php-dev.in:8844/trainingapp/api/users/register",
      login: "http://staging.php-dev.in:8844/trainingapp/api/users/login",
      forgot: "http://staging.php-dev.in:8844/trainingapp/api/users/forgot",
      chnage: "http://staging.php-dev.in:8844/trainingapp/api/users/change",
      update: "http://staging.php-dev.in:8844/trainingapp/api/users/update",
      getUserdata:
        "http://staging.php-dev.in:8844/trainingapp/api/users/getUserData"
    },
    products: {
      getList:
        "http://staging.php-dev.in:8844/trainingapp/api/products/getList",
      getDetail:
        "http://staging.php-dev.in:8844/trainingapp/api/products/getDetail",
      setRatings:
        "http://staging.php-dev.in:8844/trainingapp/api/products/setRating"
    },
    cart: {
      addToCart: "http://staging.php-dev.in:8844/trainingapp/api/addToCart",
      editCart: "http://staging.php-dev.in:8844/trainingapp/api/editCart",
      deleteCart: "http://staging.php-dev.in:8844/trainingapp/api/deleteCart",
      cart: "http://staging.php-dev.in:8844/trainingapp/api/cart"
    },
    order: {
      order: "http://staging.php-dev.in:8844/trainingapp/api/order",
      orderList: "http://staging.php-dev.in:8844/trainingapp/api/orderList",
      orderDetail: "http://staging.php-dev.in:8844/trainingapp/api/orderDetail"
    }
  },
  app: {
    Heading: "NeoSTORE"
  }
};

export default strings;
