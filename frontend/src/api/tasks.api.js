import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async () => {
  const res = await api.get("/");
  return res.data;
};

export const createTask = async (task) => {
  const res = await api.post("/", task);
  return res.data;
};

export const deleteTaskById = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export const updateTaskById = async (id, task) => {
  const res = await api.patch(`/${id}`, task);
  return res.data;
};
