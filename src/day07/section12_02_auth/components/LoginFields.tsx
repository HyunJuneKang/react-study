import type { MemberType } from "@/day07/section12_02_auth/MemberType";
import FormInput from "@/day07/section12_02_auth/components/FormInput";

interface Props {
  form: MemberType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordAutoComplete: "current-password" | "new-password";
}

export default function LoginFields({
  form,
  onChange,
  passwordAutoComplete,
}: Props) {
  return (
    <>
      <FormInput
        label="아이디"
        name="mid"
        value={form.mid}
        onChange={onChange}
        autoComplete="username"
      />
      <FormInput
        label="비밀번호"
        name="mpassword"
        type="password"
        value={form.mpassword}
        onChange={onChange}
        autoComplete={passwordAutoComplete}
      />
    </>
  );
}
