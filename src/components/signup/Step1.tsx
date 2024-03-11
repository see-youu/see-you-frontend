import SubmitButton from "../button/SubmitButton";
import InputField from "../input/InputField";
import InputSection from "../input/InputSection";

type Step1Props = {
  onSubmit: () => void;
};

const Step1: React.FC<Step1Props> = ({ onSubmit }) => {
  return (
    <>
      <h2 className="text-lg">회원정보</h2>
      <form
        className="flex flex-col gap-3 w-80"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <InputSection label="아이디">
          <InputField required type="text" placeholder="아이디를 입력하세요." />
        </InputSection>
        <InputSection label="비밀번호">
          <InputField
            required
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
          <InputField
            required
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요."
          />
        </InputSection>
        <InputSection label="이름">
          <InputField required type="text" placeholder="이름을 입력하세요." />
        </InputSection>
        <InputSection label="닉네임">
          <InputField required type="text" placeholder="닉네임을 입력하세요." />
        </InputSection>
        <InputSection label="이메일 (선택)">
          <InputField type="email" placeholder="이메일을 입력하세요." />
        </InputSection>
        <SubmitButton>가입하기</SubmitButton>
      </form>
    </>
  );
};

export default Step1;
