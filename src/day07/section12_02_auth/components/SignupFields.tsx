import type { MemberType } from "@/day07/section12_02_auth/MemberType";
import FormInput from "@/day07/section12_02_auth/components/FormInput";

interface Props {
  form: MemberType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenPostcode: () => void;
}

//회원가입 창임
export default function SignupFields({
  form,
  onChange,
  onOpenPostcode,
}: Props) {
  return (
    <>
      <FormInput
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={onChange}
        autoComplete="new-password"
      />

      <FormInput
        label="이름"
        name="mname"
        value={form.mname}
        onChange={onChange}
      />

      {/* 권한 */}
      <div className="flex gap-4 text-sm">
        {["ADMIN", "MANAGER", "USER"].map((role) => (
          <label key={role} className="flex items-center gap-1">
            <input
              type="radio"
              name="mrole"
              value={role}
              checked={form.mrole === role}
              onChange={onChange}
            />
            {role}
          </label>
        ))}
      </div>

      {/* 주소 */}
      <div className="flex gap-2">
        <FormInput
          label="주소"
          name="address"
          value={form.address}
          onChange={onChange}
          readOnly
          placeholder="우편번호 검색"
        />
        <button
          type="button"
          onClick={onOpenPostcode}
          className="self-end rounded-md bg-gray-200 px-3 py-2
            text-sm"
        >
          검색
        </button>
      </div>

      <FormInput
        label="상세주소"
        name="addressDetail"
        value={form.addressDetail}
        onChange={onChange}
      />
    </>
  );
}
