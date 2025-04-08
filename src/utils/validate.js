const nicknameRegExp = /^[a-zA-Z0-9]{4,12}$/;

function validateNickname(nickname) {
  if (nicknameRegExp.test(nickname)) {
      nickname = "닉네임은 4~12자의 영문 대소문자와 숫자로만 입력해 주세요.";
  }

    return nickname;
}

export { validateNickname };