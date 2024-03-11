type Step0Props = {
  onNext: () => void;
  onSendCode: () => void;
};

const Step0: React.FC<Step0Props> = ({ onNext, onSendCode }) => {
  return (
    <>
      <h2 className="text-lg">전화번호 인증</h2>
      <section className="flex flex-col gap-2">
        <span className="text-sm">전화번호</span>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="전화번호를 입력하세요."
            className="inline-block h-10 px-2 text-sm border border-gray-400 border-solid rounded w-60"
          />
          <button
            className="h-10 px-3 text-sm rounded bg-customYellow w-28"
            onClick={onSendCode}
          >
            인증번호 전송
          </button>
        </div>
        <input
          type="text"
          placeholder="인증코드를 입력하세요."
          className="inline-block w-full h-10 px-2 text-sm border border-gray-400 border-solid rounded"
        />
        <button
          className="w-full h-10 px-3 text-sm rounded bg-customYellow"
          onClick={onNext}
        >
          확인
        </button>
      </section>
    </>
  );
};

export default Step0;
