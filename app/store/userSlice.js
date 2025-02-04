const { createSlice } = require("@reduxjs/toolkit");

const users = createSlice({
  name: "users",
  initialState: {
    datas: [
      {
        id: 1,
        name: "Abdulla Abdullazade",
        dataCreated: "4/2/2025",
        role: "avaraokhlan",
        status: "offline",
      },

      {
        id: 2,
        name: "Abdulla Abdullazade",
        dataCreated: "4/2/2025",
        role: "avaraokhlan",
        status: "offline",
      },
      {
        id: 3,
        name: "Abdulla Abdullazade",
        dataCreated: "4/2/2025",
        role: "avaraokhlan",
        status: "offline",
      },
    ],
  },
  reducers: {
    addUser: (state, actions) => {
      actions.payload.id = state.datas.length + 1;
      state.datas.push(actions.payload);
    },
    deleteUser: (state, actions) => {
      state.datas = state.datas.filter((i) => i.id != actions.payload.id);
      for (let i of state.datas) {
        i["id"] = state.datas.indexOf(i) + 1;
      }
    },
    updateUser: (state, actions) => {
      for (let i of state.datas) {
        console.log(i.id == actions.payload.id);
        if (i.id == actions.payload.id) {
          console.log("as");
          actions.payload.dataCreated = i.dataCreated;
          state.datas[state.datas.indexOf(i)] = actions.payload;

          break;
        }
      }
    },
  },
});

export default users.reducer;
export const { addUser, deleteUser, updateUser } = users.actions;
export const datas = (state) => state.users.datas;
