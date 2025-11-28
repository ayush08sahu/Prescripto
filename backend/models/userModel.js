import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIG9wYWNpdHk9IjAuNCIgZD0iTTEyLjEyMDcgMTIuNzhDMTIuMDUwNyAxMi43NyAxMS45NjA3IDEyLjc3IDExLjg4MDcgMTIuNzhDMTAuMTIwNyAxMi43MiA4LjcyMDcgMTEuMjggOC43MjA3IDkuNTA5OThDOC43MjA3IDcuNjk5OTggMTAuMTgwNyA2LjIyOTk4IDEyLjAwMDcgNi4yMjk5OEMxMy44MTA3IDYuMjI5OTggMTUuMjgwNyA3LjY5OTk4IDE1LjI4MDcgOS41MDk5OEMxNS4yNzA3IDExLjI4IDEzLjg4MDcgMTIuNzIgMTIuMTIwNyAxMi43OFoiIHN0cm9rZT0iIzI5MkQzMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPHBhdGggb3BhY2l0eT0iMC4zNCIgZD0iTTE4LjczOTggMTkuMzgwMUMxNi45NTk4IDIxLjAxMDEgMTQuNTk5OCAyMi4wMDAxIDExLjk5OTggMjIuMDAwMUM5LjM5OTc3IDIyLjAwMDEgNy4wMzk3NyAyMS4wMTAxIDUuMjU5NzcgMTkuMzgwMUM1LjM1OTc3IDE4LjQ0MDEgNS45NTk3NyAxNy41MjAxIDcuMDI5NzcgMTYuODAwMUM5Ljc2OTc3IDE0Ljk4MDEgMTQuMjQ5OCAxNC45ODAxIDE2Ljk2OTggMTYuODAwMUMxOC4wMzk4IDE3LjUyMDEgMTguNjM5OCAxOC40NDAxIDE4LjczOTggMTkuMzgwMVoiIHN0cm9rZT0iIzI5MkQzMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPHBhdGggZD0iTTEyIDIyQzE3LjUyMjggMjIgMjIgMTcuNTIyOCAyMiAxMkMyMiA2LjQ3NzE1IDE3LjUyMjggMiAxMiAyQzYuNDc3MTUgMiAyIDYuNDc3MTUgMiAxMkMyIDE3LjUyMjggNi40NzcxNSAyMiAxMiAyMloiIHN0cm9rZT0iIzI5MkQzMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPC9zdmc+" },
    address: { type: Object, default: {line1: "", line2: ""} },
    gender: { type: String, default:"Not Selected"},
    dob: { type: String, default:"Not Selected"},
    phone: { type: String, default:"0000000000" },
    notifications: [
      {
        type: { type: String, default: "info" },
        message: { type: String },
        appointmentId: { type: String },
        date: { type: Number, default: Date.now },
        read: { type: Boolean, default: false },
      },
    ],
  });

const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
