import { Link } from "@link";


export default function TermsAndConditions ({ usePageTitle }) {

  usePageTitle("Terms and Conditions");

  return (
    <>
      <h1>Terms and Conditions</h1>

      <p className="last-updated">
        <strong>Last updated:</strong> September 18, 2026
      </p>

      <section>
        <h2>1. Introduction</h2>

        <p>
          Welcome to our website. By accessing or using this website, you
          agree to be bound by these Terms and Conditions. If you do not
          agree with these terms, please do not use the website.
        </p>
      </section>

      <section>
        <h2>2. Products and Services</h2>

        <p>
          We make reasonable efforts to ensure that product descriptions,
          images, prices, and other information displayed on the website are
          accurate and up to date. However, we do not guarantee that all
          information will always be complete, accurate, or free from errors.
        </p>

        <p>
          Product availability may change without notice.
        </p>
      </section>

      <section>
        <h2>3. Prices and Payments</h2>

        <p>
          All prices displayed on the website are shown in the applicable
          currency and may be changed at any time.
        </p>

        <p>
          By placing an order, you agree to provide accurate and complete
          payment and contact information.
        </p>
      </section>

      <section>
        <h2>4. Orders</h2>

        <p>
          Placing an order constitutes a request to purchase a product.
          We reserve the right to accept or decline an order for reasons
          including product availability, pricing errors, or suspected
          fraudulent activity.
        </p>

        <p>
          If we are unable to fulfill an order, we will notify you and,
          where applicable, refund any payment that has already been made.
        </p>
      </section>

      <section>
        <h2>5. Shipping and Delivery</h2>

        <p>
          Delivery times provided on the website are estimates and may vary
          depending on the destination, shipping provider, and other
          circumstances outside our control.
        </p>

        <p>
          We are not responsible for delays caused by circumstances beyond
          our reasonable control.
        </p>
      </section>

      <section>
        <h2>6. Returns and Refunds</h2>

        <p>
          Returns and refunds are subject to our applicable return and
          refund policy and to any rights provided to consumers by
          applicable law.
        </p>

        <p>
          Please contact us if you have a problem with an order so that we
          can help resolve the issue.
        </p>
      </section>

      <section>
        <h2>7. Website Use</h2>

        <p>
          You agree to use this website only for lawful purposes and in a
          manner that does not interfere with the operation or security of
          the website.
        </p>

        <p>
          You must not attempt to gain unauthorized access to the website,
          its systems, or its data.
        </p>
      </section>

      <section>
        <h2>8. Intellectual Property</h2>

        <p>
          Unless otherwise stated, the content of this website, including
          text, images, logos, graphics, and software, is owned by or
          licensed to us and may not be reproduced or distributed without
          permission.
        </p>
      </section>

      <section>
        <h2>9. Privacy</h2>

        <p>
          Your use of this website may involve the collection and processing
          of personal information. Please refer to our <Link route="privacy">Privacy Policy</Link> for
          information about how personal data is collected, used, and
          protected.
        </p>
      </section>

      <section>
        <h2>10. Changes to These Terms</h2>

        <p>
          We may update these Terms and Conditions from time to time. Any
          changes will be posted on this page along with the date on which
          they take effect.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>

        <p>
          If you have questions about these Terms and Conditions, please
          contact us through the contact information provided on this
          website.
        </p>
      </section>
    </>
  );
};