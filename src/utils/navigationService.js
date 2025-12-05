let navigator = null;
export const setNavigator = (navFunction) => {
  navigator = navFunction;
};

export const navigateTo = (path) => {
  if (navigator) {
    navigator(path);
  } else {
    console.warn("Navigator chưa được khởi tạo!");
  }
};
