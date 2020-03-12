const DEFAULT = {
  one: "123",
  two: "456"
};

export default function reducerOne(state = DEFAULT, action) {
  switch (action.type) {
    default:
      return state;
  }
}
