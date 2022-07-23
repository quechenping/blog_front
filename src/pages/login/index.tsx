import { useRef } from "react";
import API from "@/utils/API";
import ajax from "@/utils/request";
import { message } from "@/components";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const handleClick = async (type: "login" | "regist") => {
    const data = {
      name: userRef?.current.value,
      password: passRef?.current.value,
    };

    if (!userRef?.current.value || !passRef?.current.value) {
      message.error("请输入账号和密码");
    } else {
      const res = await ajax(type === "login" ? API.login : API.sign, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.errCode !== 200) {
        message.error(res.message);
      } else {
        message.success("登录成功");
        window.location.replace("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="w-1/3">
        <input
          ref={userRef}
          type="text"
          name="user"
          className="input-border-b"
          placeholder="User name"
        />
        <input
          ref={passRef}
          type="password"
          name="password"
          className="input-border-b mt-1"
          placeholder="Password"
        />
      </div>
      <div className="flex space-x-3 mt-2">
        <button
          className="bg-black text-white"
          onClick={() => {
            handleClick("login");
          }}
        >
          登录
        </button>
        <button
          type="button"
          onClick={() => {
            handleClick("regist");
          }}
        >
          注册
        </button>
      </div>
    </div>
  );
};

export default Login;

Login.hiddenLayout = true;
