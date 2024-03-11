import SubmitButton from "../button/SubmitButton";
import InputField from "../input/InputField";
import InputSection from "../input/InputSection";

type Step0Props = {
  onNext: () => void;
  onSendCode: () => void;
};

const Step0: React.FC<Step0Props> = ({ onNext, onSendCode }) => {
  return (
    <>
      <h2 className="text-lg">전화번호 인증</h2>
      <InputSection label="전화번호" className="gap-3">
        <div className="flex gap-2">
          <InputField
            type="text"
            placeholder="전화번호를 입력하세요."
            width="w-60"
          />
          <SubmitButton width="w-28" onClick={onSendCode}>
            인증번호 전송
          </SubmitButton>
        </div>
        <InputField type="text" placeholder="인증코드를 입력하세요." />
        <SubmitButton onClick={onNext}>확인</SubmitButton>
      </InputSection>
    </>
  );
};

export default Step0;
