const baseChattingList = document.querySelector(
  ".chat-scrollable-area__message-container"
);

const 채팅내역 = (() => {
  let chattingList = [];

  const 초기화 = () => {
    chattingList = [];
  };

  const 보기 = () => {
    return chattingList;
  };

  const push = (data) => {
    chattingList.push(data);
  };

  return {
    초기화,
    보기,
    push,
  };
})();

const observer = new MutationObserver((e) => {
  e.forEach((mutationRecord) => {
    if (mutationRecord.addedNodes.length === 0) return;
    const userName = mutationRecord.addedNodes[0].querySelector(
      ".chat-author__display-name"
    ).innerHTML;
    const userId = mutationRecord.addedNodes[0]
      .querySelector(".chat-author__intl-login")
      ?.innerHTML.replace(/\(|\)/g, "");
    let chatting = "";
    mutationRecord.addedNodes[0]
      .querySelector(`span[data-a-target="chat-line-message-body"]`)
      .childNodes.forEach((node) => {
        if (node.tagName === "DIV") {
          chatting += `(이모티콘)`;
        } else {
          chatting += node.innerHTML;
        }
      });
    const chattingData = {
      userName,
      userId: userId ?? userName,
      chatting,
    };
    채팅내역.push(chattingData);
  });
});

observer.observe(baseChattingList, { childList: true });
