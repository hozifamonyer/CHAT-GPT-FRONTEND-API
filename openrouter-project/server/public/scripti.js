document.getElementById("submit-btn").addEventListener("click", function () {
  const question = document.getElementById("word-input").value.trim();

  if (!question) {
    alert("يرجى إدخال سؤال أولاً");
    return;
  }

  fetch("http://localhost:3000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("reply-content").innerText =
        data.answer || "لا يوجد رد";
      document.getElementById("word-input").value = ""; // مسح السؤال بعد الإرسال
    })
    .catch((err) => {
      console.error(err);
      alert("حدث خطأ في الاتصال بالسيرفر");
    });
});
