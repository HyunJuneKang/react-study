import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "@/day07/section12_02_auth/useAuth";
import ApiService from "@/day07/section12_02_auth/service/ApiService";
import type { MemberType } from "@/day07/section12_02_auth/MemberType";
import { useLocation, useNavigate } from "react-router-dom";
import LoginFields from "@/day07/section12_02_auth/components/LoginFields";
import SignupFields from "@/day07/section12_02_auth/components/SignupFields";
import AddressModal from "@/day07/section12_02_auth/components/AddressModel";

const initMember = {
  mid: "",
  mpassword: "",
  confirmPassword: "",
  mname: "",
  mrole: "USER",
  address: "",
  addressDetail: "",
} satisfies MemberType;
const savedMid = localStorage.getItem("mid");

//로그인과 회원가입처리 로직

export default function AuthPage() {
  const { login } = useAuth(); //Hook=>Context에있는 기능 가져오기
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //isLoginMode? 로그인화면
  //isLoginMode==false? 회원가입 화면
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState<MemberType>({
    ...initMember,
    mid: savedMid ?? "",
  });
  const [error, setError] = useState("");
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [rememberMid, setRememberMid] = useState(!!savedMid);

  useEffect(() => {
    document.body.style.overflow = isPostcodeOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPostcodeOpen]);

  const handlePostcodeComplete = (data: { address: string }) => {
    setForm((prev) => ({ ...prev, address: data.address }));
    setIsPostcodeOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    setForm(initMember);
    setError("");
  };
  const validateSignup = () => {
    if (form.mpassword !== form.confirmPassword)
      return "비밀번호가 일치하지 않습니다.";
    if (!form.mname) return "이름을 입력해주세요.";
    if (!form.address || !form.addressDetail)
      return "주소와 상세주소를 모두 입력해주세요.";
    return null;
  };

  const signup = async () => {
    const { mid, mpassword, mname, mrole } = form;
    // Spring의 /auth/joinProc는 @RequestBody JSON이 아니라
    // HTML form(application/x-www-form-urlencoded) 형식으로 받는다.
    const signupForm = new URLSearchParams({
      mid,
      mpassword,
      mname,
      mrole,
    });
    await ApiService.post("/auth/joinProc", signupForm, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  };
  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message ?? err.response?.data ?? "서버오류");
    } else {
      setError("알 수 없는 오류가 발생했습니다.");
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!isLoginMode) {
      const msg = validateSignup();
      if (msg) {
        setError(msg);
        return;
      }
    }
    try {
      if (isLoginMode) {
        await login({ mid: form.mid, mpassword: form.mpassword });
        if (rememberMid) {
          localStorage.setItem("mid", form.mid);
        } else {
          localStorage.removeItem("mid");
        }
        navigate(from, { replace: true });
        return;
      }
      await signup();
      alert("회원가입 성공! 이제 로그인해주세요.");
      toggleMode();
    } catch (err: unknown) {
      handleAxiosError(err);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center
      bg-gray-100"
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6
        shadow"
      >
        <h2 className="mb-6 text-center text-xl font-bold">
          {isLoginMode ? "로그인" : "회원가입"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col
          gap-4"
        >
          <LoginFields
            form={form}
            onChange={handleChange}
            passwordAutoComplete={
              isLoginMode ? "current-password" : "new-password"
            }
          />

          {isLoginMode && (
            <label
              className="flex items-center gap-1 text-sm
              text-gray-600"
            >
              <input
                type="checkbox"
                checked={rememberMid}
                onChange={(e) => setRememberMid(e.target.checked)}
              />
              아이디 저장
            </label>
          )}

          {!isLoginMode && (
            <SignupFields
              form={form}
              onChange={handleChange}
              onOpenPostcode={() => setIsPostcodeOpen(true)}
            />
          )}

          {error && (
            <p
              className="rounded bg-red-100 p-2 text-sm
              text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="rounded-md bg-blue-600 py-2 text-white
              hover:bg-blue-700"
          >
            {isLoginMode ? "로그인" : "회원가입"}
          </button>
        </form>

        <button
          type="button"
          onClick={toggleMode}
          className="mt-4 w-full text-sm text-gray-600"
        >
          {isLoginMode ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
        </button>
      </div>

      {isPostcodeOpen && (
        <AddressModal
          onClose={() => setIsPostcodeOpen(false)}
          onComplete={handlePostcodeComplete}
        />
      )}
    </div>
  );
}
