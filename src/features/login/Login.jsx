import { Input } from "./Input";
import fbIcon from "../../assets/icons/fb_icon.png";
import ggIcon from "../../assets/icons/gg_icon.webp";
import { useNavigate } from "react-router";
import authApi from "../../api/authApi";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const handleLogin = async () => {
    try {
      const response = await authApi.login({ email, password });
      const { user, access_token } = response.data?.data;
      login(user, access_token);
      navigate("/admin");
    } catch (error) {
      //err
    }
  };
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-[#E8F5E8] via-[#F1F8E9] to-[#E8F5E8]">
      {/* form */}
      <div className="bg-white h-150 w-120 my-23 flex-col justify-center font-roboto px-10 py-13 shadow-md">
        {/* title */}
        <div className="text-3xl font-normal pb-5 text-black">
          Đăng nhập{" "}
          <span className="font-bold text-primary">Giò Chả Admin</span>
        </div>
        {/* some think */}
        <div className="text-gray-500 font-light text-xl pb-2 mb-7">
          Vui lòng đăng nhập để tiếp tục sử dụng hệ thống
        </div>
        {/* input */}
        <div className=" flex flex-col">
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        {/* remember-forgot */}
        <div className=" flex justify-between my-5">
          {/* remember */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className=" w-5 h-5 rounded-2x mr-2 accent-primary cursor-pointer"
            />
            <p className=" text-primary text-s"> Ghi nhớ đăng nhập</p>
          </div>
          {/* forgot */}
          <div className=" text-primary text-s underline cursor-pointer">
            Quên mật khẩu&#63;
          </div>
        </div>
        <div className=" flex justify-center mt-3">
          <button
            onClick={handleLogin}
            className=" bg-primary px-20 py-3 cursor-pointer text-white text-s rounded-full hover:bg-green-700 transition-all duration-200 ease-in-out active:scale-95"
          >
            Đăng nhập
          </button>
        </div>
        <div className=" flex justify-center my-5">
          <p className=" text-lg text-gray-500">hoặc</p>
        </div>
        {/* fb-gmail */}
        <div className=" flex justify-center items-center ">
          <img
            src={fbIcon}
            className=" h-[42px] mr-2 object-cover cursor-pointer"
          />
          <img
            src={ggIcon}
            className=" h-[50px] ml-2 object-cover cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
