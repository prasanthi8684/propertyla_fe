import apartmentBg from "../../../public/assets/img/apartment/apartment-bg.png";
import Link from "next/link";

export default function HomeApartmentArea() {
  return (
    <section
      className="tp-appartment-area pt-180 pb-180 include-bg"
      style={{ backgroundImage: `url(${apartmentBg.src})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-apartment-wrapper text-center">
              <h3 className="tp-section-title">
                Join with us and <br /> experience today
              </h3>
              <Link className="tp-btn" href="/search">
                <span className="btn-wrap">
                  <b className="text-1">Discover Apartments</b>
                  <b className="text-2">Discover Apartments</b>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
