<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
      .separador {
      	border-bottom: solid 1px #e8e8e8;
      	display: block;
      	padding-top: 15px;
      }

	  .corpo-mensagem {
      	font-family: 'Courier New', Courier, monospace;
      }

	  .dados{
		margin-top: 2.5rem;
		margin-bottom: 2rem;
	  }

	  .dados .col{
		padding-left: 1.5rem;
	  }

	  .centralizado{
		text-align: center;
	  }

	  .destaque{
		font-weight: bold;
	  }
    </style>
  </head>
  <body class="corpo-mensagem">
    <p><span class="destaque">Prezado(a)</span>,</p>
    ${mensagem}
    <p>
      <div>--</div>
      <div>Atenciosamente,</div>
      <div>SIGLA_APP | Descrição do Sistema AppName</div>
      <div>Tribunal Regional do Trabalho da 8&ordf; Região</div>
    </p>
    <div class="separador"></div>
    <p style="color: #999999; font-size: 0.8em;"><b>Não responda</b>. Este e-mail foi enviado automaticamente pelo Sistema de Sustentabilidade do Tribunal Regional do Trabalho da 8&ordf; Região.</p>
  </body>
</html>
