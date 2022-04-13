import '../../styles/footer.css'
import footerLogo from '../../assets/footer-logo.svg'

const Footer = () => {
		return (
				<footer>
						<img src={footerLogo} alt="logo"/>
						<section className="footer-categories">
								<div className="footer-left">
										<ul className="footer-left-item">
												<span>Раздел1</span>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
										</ul>
										<ul className="footer-left-item">
												<span>Раздел2</span>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
										</ul>
								</div>
								<div className="circle"/>
								<div className="footer-right">
										<ul className="footer-right-item">
												<span>Раздел1</span>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
										</ul>
										<ul className="footer-right-item">
												<span>Раздел2</span>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
												<li>Подраздел</li>
										</ul>
								</div>
						</section>
				</footer>
		)
}
export default Footer