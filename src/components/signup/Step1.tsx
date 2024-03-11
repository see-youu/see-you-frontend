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
        <section className="flex flex-col gap-1">
          <span className="text-sm">아이디</span>
          <input
            required
            type="text"
            placeholder="아이디를 입력하세요."
            className="inline-block w-full h-10 px-2 text-sm border border-gray-400 border-solid rounded"
          />
        </section>
        <section className="flex flex-col gap-1">
          <span className="text-sm">비밀번호</span>
          <input
            required
            type="password"
            placeholder="비밀번호를 입력하세요."
            className="inline-block w-full h-10 px-2 text-sm border border-gray-400 border-solid rounded"
          />
          <input
            required
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요."
            className="inline-block w-full h-10 px-2 text-sm border border-gray-400 border-solid rounded"
          />
        </section>
        <section className="flex flex-col gap-1">
          <span className="text-sm">이름</span>
          <div className="flex gap-1">
            <input
              required
              type="text"
              placeholder="이름을 입력하세요."
              className="inline-block w-full h-10 px-2 text-sm border border-gray-400 border-solid rounded"
            />
          </div>
        </section>
        <section className="flex flex-col gap-1">
          <span className="text-sm">닉네임</span>
          <div className="flex gap-2">
            <input
              required
              type="text"
              placeholder="닉네임을 입력하세요."
              className="inline-block w-full h-10 px-2 text-sm border border-gray-400 border-solid rounded"
            />
          </div>
        </section>
        <section className="flex flex-col gap-1">
          <span className="text-sm">이메일 (선택)</span>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              className="inline-block w-full h-10 px-2 text-sm border border-gray-400 border-solid rounded"
            />
          </div>
        </section>
        <button className="w-full h-10 px-3 text-sm rounded bg-customYellow">
          가입하기
        </button>
      </form>
    </>
  );
};

export default Step1;
