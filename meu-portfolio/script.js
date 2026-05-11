// Apply the theme before loading content
(function () {
  const theme = localStorage.getItem("theme");

  if (theme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.add("dark");
  }
})();

// Load theme state when page loads
window.addEventListener("load", () => {
  const chk = document.getElementById("chk");

  if (chk) {
    const theme = localStorage.getItem("theme");

    if (theme === "light") {
      document.body.classList.add("light");
      chk.checked = true;
    }

    chk.addEventListener("change", () => {
      if (chk.checked) {
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
    });
  }
});

// FORMULÁRIO
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
      const resposta = await fetch("http://localhost:3000/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          mensagem,
        }),
      });

      const resultado = await resposta.json();

      alert("✅ Formulário enviado com sucesso!");

      form.reset();
    } catch (erro) {

  console.error(erro);

  alert(erro.message);
}
  });
}