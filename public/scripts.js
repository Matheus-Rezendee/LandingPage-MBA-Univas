let images = ["images/depoimento-1.png", "images/depoimento-2.png"];
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("testimonial-img").src = images[currentIndex];
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("testimonial-img").src = images[currentIndex];
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".mba-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
      nome: form.elements["nome"].value,
      email: form.elements["email"].value,
      telefone: form.elements["telefone"].value,
      cargo: form.elements["cargo"].value,
      formacao: form.elements["formacao"].value,
      faixa_salarial: form.elements["faixa_salarial"].value,
    };

    try {
      const resposta = await fetch("/inscricao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        alert("Inscrição enviada com sucesso!");
        form.reset();
      } else {
        alert("Erro: " + resultado.mensagem);
      }
    } catch (erro) {
      alert("Erro ao enviar os dados: " + erro.message);
    }
  });
});
