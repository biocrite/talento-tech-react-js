import { Link } from "@link";

export default function TermsAndConditions ({ usePageTitle }) {

  usePageTitle("Termos e Condições");
  
  return (
    <>
      <h1>Termos e Condições</h1>

      <p className="last-updated">
        <strong>Última atualização:</strong> 18 de setembro de 2026
      </p>

      <section>
        <h2>1. Introdução</h2>

        <p>
          Bem-vindo ao nosso site. Ao acessar ou utilizar este site, você
          concorda em cumprir estes Termos e Condições. Se você não concordar
          com estes termos, não utilize o site.
        </p>
      </section>

      <section>
        <h2>2. Produtos e Serviços</h2>

        <p>
          Fazemos esforços razoáveis para garantir que as descrições dos
          produtos, imagens, preços e outras informações exibidas no site
          sejam precisas e estejam atualizadas. No entanto, não garantimos
          que todas as informações estejam sempre completas, precisas ou
          livres de erros.
        </p>

        <p>
          A disponibilidade dos produtos pode mudar sem aviso prévio.
        </p>
      </section>

      <section>
        <h2>3. Preços e Pagamentos</h2>

        <p>
          Todos os preços exibidos no site são apresentados na moeda
          aplicável e podem ser alterados a qualquer momento.
        </p>

        <p>
          Ao realizar um pedido, você concorda em fornecer informações de
          pagamento e contato precisas e completas.
        </p>
      </section>

      <section>
        <h2>4. Pedidos</h2>

        <p>
          A realização de um pedido constitui uma solicitação para a compra
          de um produto. Reservamo-nos o direito de aceitar ou recusar um
          pedido por motivos que incluem indisponibilidade do produto, erros
          de preço ou suspeita de atividade fraudulenta.
        </p>

        <p>
          Se não pudermos atender a um pedido, notificaremos você e, quando
          aplicável, reembolsaremos qualquer pagamento que já tenha sido
          realizado.
        </p>
      </section>

      <section>
        <h2>5. Envio e Entrega</h2>

        <p>
          Os prazos de entrega informados no site são estimativas e podem
          variar dependendo do destino, da transportadora e de outras
          circunstâncias fora do nosso controle.
        </p>

        <p>
          Não nos responsabilizamos por atrasos causados por circunstâncias
          além do nosso controle razoável.
        </p>
      </section>

      <section>
        <h2>6. Devoluções e Reembolsos</h2>

        <p>
          Devoluções e reembolsos estão sujeitos à nossa política de
          devolução e reembolso aplicável, bem como a quaisquer direitos
          garantidos aos consumidores pela legislação aplicável.
        </p>

        <p>
          Entre em contato conosco caso tenha algum problema com um pedido
          para que possamos ajudar a resolver a situação.
        </p>
      </section>

      <section>
        <h2>7. Uso do Site</h2>

        <p>
          Você concorda em utilizar este site apenas para fins legais e de
          maneira que não interfira no funcionamento ou na segurança do
          site.
        </p>

        <p>
          Você não deve tentar obter acesso não autorizado ao site, aos seus
          sistemas ou aos seus dados.
        </p>
      </section>

      <section>
        <h2>8. Propriedade Intelectual</h2>

        <p>
          Salvo indicação em contrário, o conteúdo deste site, incluindo
          textos, imagens, logotipos, elementos gráficos e software, é de
          nossa propriedade ou está licenciado para nós e não pode ser
          reproduzido ou distribuído sem autorização.
        </p>
      </section>

      <section>
        <h2>9. Privacidade</h2>

        <p>
          O uso deste site pode envolver a coleta e o processamento de
          informações pessoais. Consulte nossa{" "}
          <Link route="privacy">Política de Privacidade</Link> para
          obter informações sobre como os dados pessoais são coletados,
          utilizados e protegidos.
        </p>
      </section>

      <section>
        <h2>10. Alterações a Estes Termos</h2>

        <p>
          Podemos atualizar estes Termos e Condições periodicamente. Quaisquer
          alterações serão publicadas nesta página juntamente com a data em
          que entrarão em vigor.
        </p>
      </section>

      <section>
        <h2>11. Contato</h2>

        <p>
          Se você tiver dúvidas sobre estes Termos e Condições, entre em
          contato conosco por meio das informações de contato fornecidas
          neste site.
        </p>
      </section>
    </>
  );
}