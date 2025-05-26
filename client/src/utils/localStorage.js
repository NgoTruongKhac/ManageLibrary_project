// localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined; // Cho phép Redux dùng initialState
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    // Lỗi ghi localStorage
    console.log(e);
  }
};
