import "./Footer.css"
import img from "../tikstock_logo.png"
export default function Footer() {
  return (
    <div className="footer">
      <section className="copyrights">
        <img src={img} alt="" />
        <p>&copy; 2023 All the rights reserved to tikStock inc.</p>
      </section>

      <section className="socials">
        <p>Contact us and Follow our Socials</p>
        <section className="socials-images">
          <img src="/envelope.png" alt="" />
          <img src="/facebook.png" alt="" />
          <img src="/instagram.png" alt="" />
        </section>
      </section>
    </div>
  )
}
