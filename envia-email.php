<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Variáveis do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $mensagem = $_POST['mensagem'];

    // Endereço de email para onde enviar
    $destinatario = "gabriel.j.s.o040804@gmail.com";

    // Assunto do email
    $assunto = "Contato do Blog sobre Búfalos";

    // Corpo do email
    $corpo_email = "Nome: $nome\n";
    $corpo_email .= "Email: $email\n";
    $corpo_email .= "Mensagem:\n$mensagem";

    // Enviar email
    if (mail($destinatario, $assunto, $corpo_email)) {
        echo "<p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>";
    } else {
        echo "<p>Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.</p>";
    }
}
?>
