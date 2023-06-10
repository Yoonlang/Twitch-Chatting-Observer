const chattingList = document.querySelector(
  ".chat-scrollable-area__message-container"
);

const observer = new MutationObserver((e) => {
  e.forEach((mutationRecord) => {
    if (mutationRecord.addedNodes.length === 0) return;
    console.log(
      mutationRecord.addedNodes[0].querySelector(".chat-author__display-name")
        .innerHTML,
      mutationRecord.addedNodes[0].querySelector(".chat-author__intl-login")
        .innerHTML,
      mutationRecord.addedNodes[0].querySelector(".text-fragment").innerHTML
    );
  });
});

observer.observe(chattingList, { childList: true });
