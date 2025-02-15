import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
function GoogleLogin() {
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      if (!authResult["code"]) {
        console.log("error token is required");
        return;
      }
      console.log(authResult);
      toast.loading("loading...", { id: "loading" });
      axios
        .get(`/api/v1/users/auth/google?code=${authResult["code"]}`)
        .then((res) => {
          console.log(res);
          toast.dismiss("loading");
          toast.success(res.data.message);
          navigate("/", { replace: true });
          return;
        });
    } catch (error) {
      toast.dismiss("loading");
      console.log("====================================");
      console.log(error.response.data.message);
      console.log("====================================");
      return;
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <div className="google-login m-2">
      <Toaster />
      <button
        onClick={googleLogin}
        className="p-3 dark:bg-green-50 dark:text-black"
      >
        Google Login
      </button>
    </div>
  );
}

export default GoogleLogin;
