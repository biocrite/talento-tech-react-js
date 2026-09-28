import { Link } from "@link";

export default function TermsAndConditions ({ usePageTitle }) {

  usePageTitle("Términos y Condiciones");

  return (
    <>
      <h1>Términos y Condiciones</h1>

      <p className="last-updated">
        <strong>Última actualización:</strong> 18 de septiembre de 2026
      </p>

      <section>
        <h2>1. Introducción</h2>

        <p>
          Bienvenido a nuestro sitio web. Al acceder o utilizar este sitio web,
          usted acepta estar sujeto a estos Términos y Condiciones. Si no está
          de acuerdo con estos términos, no utilice el sitio web.
        </p>
      </section>

      <section>
        <h2>2. Productos y Servicios</h2>

        <p>
          Hacemos esfuerzos razonables para garantizar que las descripciones de
          los productos, las imágenes, los precios y demás información mostrada
          en el sitio web sean precisos y estén actualizados. Sin embargo, no
          garantizamos que toda la información sea siempre completa, precisa o
          esté libre de errores.
        </p>

        <p>
          La disponibilidad de los productos puede cambiar sin previo aviso.
        </p>
      </section>

      <section>
        <h2>3. Precios y Pagos</h2>

        <p>
          Todos los precios mostrados en el sitio web se presentan en la moneda
          correspondiente y pueden modificarse en cualquier momento.
        </p>

        <p>
          Al realizar un pedido, usted acepta proporcionar información de pago y
          contacto precisa y completa.
        </p>
      </section>

      <section>
        <h2>4. Pedidos</h2>

        <p>
          Realizar un pedido constituye una solicitud para comprar un producto.
          Nos reservamos el derecho de aceptar o rechazar un pedido por motivos
          que incluyen la falta de disponibilidad del producto, errores en los
          precios o sospechas de actividad fraudulenta.
        </p>

        <p>
          Si no podemos completar un pedido, se lo notificaremos y, cuando
          corresponda, reembolsaremos cualquier pago que ya haya sido realizado.
        </p>
      </section>

      <section>
        <h2>5. Envío y Entrega</h2>

        <p>
          Los plazos de entrega indicados en el sitio web son estimaciones y
          pueden variar según el destino, el proveedor de servicios de envío y
          otras circunstancias fuera de nuestro control.
        </p>

        <p>
          No nos hacemos responsables de los retrasos causados por
          circunstancias que estén fuera de nuestro control razonable.
        </p>
      </section>

      <section>
        <h2>6. Devoluciones y Reembolsos</h2>

        <p>
          Las devoluciones y los reembolsos están sujetos a nuestra política de
          devoluciones y reembolsos aplicable, así como a cualquier derecho
          otorgado a los consumidores por la legislación aplicable.
        </p>

        <p>
          Póngase en contacto con nosotros si tiene algún problema con un pedido
          para que podamos ayudarle a resolverlo.
        </p>
      </section>

      <section>
        <h2>7. Uso del Sitio Web</h2>

        <p>
          Usted acepta utilizar este sitio web únicamente con fines lícitos y de
          una manera que no interfiera con el funcionamiento o la seguridad del
          sitio web.
        </p>

        <p>
          No debe intentar obtener acceso no autorizado al sitio web, a sus
          sistemas o a sus datos.
        </p>
      </section>

      <section>
        <h2>8. Propiedad Intelectual</h2>

        <p>
          Salvo que se indique lo contrario, el contenido de este sitio web,
          incluidos textos, imágenes, logotipos, gráficos y software, es de
          nuestra propiedad o está bajo licencia a nuestro favor y no puede
          reproducirse ni distribuirse sin autorización.
        </p>
      </section>

      <section>
        <h2>9. Privacidad</h2>

        <p>
          El uso de este sitio web puede implicar la recopilación y el
          tratamiento de información personal. Consulte nuestra{" "}
          <Link route="privacy">Política de Privacidad</Link> para
          obtener información sobre cómo se recopilan, utilizan y protegen los
          datos personales.
        </p>
      </section>

      <section>
        <h2>10. Cambios en estos Términos</h2>

        <p>
          Podemos actualizar estos Términos y Condiciones periódicamente.
          Cualquier cambio se publicará en esta página junto con la fecha en que
          entre en vigor.
        </p>
      </section>

      <section>
        <h2>11. Contacto</h2>

        <p>
          Si tiene alguna pregunta sobre estos Términos y Condiciones, póngase
          en contacto con nosotros mediante la información de contacto
          proporcionada en este sitio web.
        </p>
      </section>
    </>
  );
}
