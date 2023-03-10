import React from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";

function Footer() {
    const experience = new Date().getFullYear() - 2020
    return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
            </div>

            <div>
                <a href='https://www.facebook.com/abdulwahab.khan.982845/' className='me-4 text-reset'>
                    <MDBIcon fab icon="facebook-f" />
                </a>
                <a href='https://www.twitter.com' className='me-4 text-reset'>
                    <MDBIcon fab icon="twitter" />
                </a>
                <a href='https://www.linkedin.com/in/abdul-wahab-khan-857642169' className='me-4 text-reset'>
                    <MDBIcon fab icon="linkedin" />
                </a>
                <a href='https://github.com/Abdul-Wahab-Khan/' className='me-4 text-reset'>
                    <MDBIcon fab icon="github" />
                </a>
            </div>
        </section>

        <section className=''>
            <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
                <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                    <MDBIcon icon="gem" className="me-3" />
                    Author
                </h6>
                <p>
                    Abdul Wahab Khan is a software developer and data analyzt with more then 
                        {` ${experience}`} of experience. <br /><br />
                        <Link to='/about-developer' className='text-reset'>
                            About Developer
                        </Link>
                </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Websites</h6>
                <p>
                    <a href='#' className='text-reset'>
                    Portfolio
                    </a>
                </p>
                <p>
                    <a href='#' className='text-reset'>
                    Blog 1
                    </a>
                </p>
                <p>
                    <a href='#' className='text-reset'>
                    Blog 2
                    </a>
                </p>
                <p>
                    <a href='#' className='text-reset'>
                    Blog 3
                    </a>
                </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                    <Link to='/about-developer' className='text-reset'>
                    About Developer
                    </Link>
                </p>
                <p>
                    <a href='#' className='text-reset'>
                    Privacy Policy
                    </a>
                </p>
                <p>
                    <a href='#' className='text-reset'>
                    Help
                    </a>
                </p>
                </MDBCol>

                <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                    <MDBIcon icon="home" className="me-2" />
                    Khushal Khan, Kabul City
                </p>
                <p>
                    <MDBIcon icon="envelope" className="me-3" />
                    ab.wahab.kh@gmail.com
                </p>
                <p>
                    <MDBIcon icon="phone" className="me-3" /> + 93 744 50 32 52
                </p>
                <p>
                    <MDBIcon icon="print" className="me-3" /> + 93 773 72 88 55
                </p>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            © {new Date().getFullYear()} Copyright:
            <a className='text-reset fw-bold' href='https://codeyourproject.wordpress.com/'>
            {` Khan's Blog`}
            </a>
        </div>
        </MDBFooter>
    )
}

export default Footer