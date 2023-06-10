const chattingList = document.querySelector(
  ".chat-scrollable-area__message-container"
);

const handledChattingList = [];

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
    handledChattingList.push(chattingData);
  });
});

observer.observe(chattingList, { childList: true });
