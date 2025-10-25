(() => {
  const form = document.getElementById("lp-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("送信ありがとうございました。担当者より最短当日中にご連絡します。");
    });
  }
})();
