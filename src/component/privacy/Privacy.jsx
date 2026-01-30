import React from 'react'
import privacy from '../../Images/privacy.shared.png'

export default function Privacy() {


    return (
        <>
            <div className='px-[22%] my-10'>
                <p><span className='text-sm'> Home > About us</span></p>
                <div className='bg-blue-50  py-5 rounded-lg mt-3'>
                    <img src={privacy} alt='...' className='w-[4%] mx-auto' />
                    <h2 className='text-center mt-3'><span className='text-center'>BRANDSDOOR Policy</span></h2>
                </div>

                {/* privacy polocy */}

                <div className='mt-5'>
                    <h2><span>Privacy Policy</span></h2>
                    <p className='mt-5' style={{ lineHeight: '1.2', fontWeight: '400' }}>
                        <span className='text-sm' style={{ fontWeight: '400', lineHeight: '0' }}>
                            BRANDSDOOR Real Estate Pvt. Ltd. (“Company”, “we”, “our”, “us”) is committed to safeguarding your personal information and ensuring transparency in how your data is collected, used, and protected. This Privacy Policy explains our practices when you visit our website, engage with our real-estate services, submit enquiries, or interact with our sales team.
                            <br />
                            <br />
                            <span>
                                By accessing or using our services, you acknowledge and agree to the terms described in this Privacy Policy.
                            </span>
                            <br />
                            <br />


                        </span></p>

                    {/* 1 point */}
                    <div>
                        <span className='text-lg font-medium'>1. Information We Collect</span>
                        <div className='ms-2'>
                            <span className=''>
                                <span className='ps-2 mt-5'> We may collect various categories of information:</span>
                                <br />
                                <br />
                                <span className='font-medium'>A. Personal Information</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        Full name
                                    </li>
                                    <li>
                                        Mobile number
                                    </li>
                                    <li>
                                        Email address
                                    </li>
                                    <li>
                                        Residential address
                                    </li>
                                    <li>
                                        Identity details (PAN, Aadhaar, if required for verification or KYC)
                                    </li>
                                    <li>
                                        Property preferences or buying requirements
                                    </li>
                                </ul>

                            </span>
                            <br />
                            <br />
                            <span>

                                <span className='font-medium'>B. Transaction & Service Information</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        Property enquiries
                                    </li>
                                    <li>
                                        Site visit details
                                    </li>
                                    <li>
                                        Booking information
                                    </li>
                                    <li>
                                        Payment or transaction records (processed through secure channels)
                                    </li>
                                </ul>

                            </span>

                            <br />
                            <br />
                            <span>

                                <span className='font-medium'>C. Technical/Automatic Data</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        Device information (IP address, browser type, device ID)
                                    </li>
                                    <li>
                                        Cookies and tracking data
                                    </li>
                                    <li>
                                        Usage details (pages viewed, clicks, time spent)
                                    </li>
                                </ul>

                            </span>

                            <br />
                            <br />
                            <span>

                                <span className='font-medium'>D. Voluntary Information</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        Feedback, complaints, or support queries
                                    </li>
                                    <li>
                                        Participation in surveys, offers, or promotional campaigns
                                    </li>
                                </ul>

                            </span>

                        </div>
                    </div>

                    {/* 2 point */}
                    <div>
                        <br />
                        <span className='text-lg font-medium'>2. How We Use Your Information</span>
                       <div className='ms-4'>
                            <span>
                                We use your information for legitimate business purposes, including:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Scheduling site visits and providing project details
                            </li>
                            <li>
                                Processing bookings, documentation, and transactions
                            </li>
                            <li>
                                Sending updates, offers, and promotional communications
                            </li>
                            <li>
                                Improving our customer experience and service quality
                            </li>
                            <li>
                                Verifying identity and preventing fraud
                            </li>
                            <li>
                                Meeting legal or regulatory compliance requirements
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>We only use your data in ways that support our services and communication with you.</span>
                    </div>

                    {/* 3 point */}
                    <br />
                    <div>
                        <span className='text-lg font-medium'>3. Sharing of Information</span>
                        <div className='ms-2'>
                            <span className=''>
                                <span className='ps-2 mt-5'> We do not sell, rent, or trade your personal data to third parties.
                                <br />
                                <span className='ps-2'>However, your information may be shared with:</span>
                                </span>
                                <br />
                                <br />
                                <span className='font-medium'>A. Service Providers</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        Payment gateways
                                    </li>
                                    <li>
                                        Marketing or customer support agencies
                                    </li>
                                    <li>
                                        IT and data hosting partners
                                    </li>
                                    <li>
                                        Verification/KYC agencies
                                    </li>
                                    <li>
                                        Channel partners or authorised real-estate agents
                                    </li>
                                </ul>

                            </span>
                            <br />
                            <br />
                            <span>

                                <span className='font-medium'>B. Legal & Regulatory Authorities</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        If mandated under law, court orders, or government directives.
                                    </li>
                                    </ul>

                            </span>

                            <br />
                            <br />
                            <span>

                                <span className='font-medium'>C. Business Partners</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        Only when required for relevant real-estate services, promotions, or customer support.
                                    </li>
                                    <li>
                                        Every third party is bound by confidentiality and is required to protect your data.
                                    </li>
                                </ul>

                            </span>

                        </div>
                    </div>

                    {/* 4 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>4. Data Security</span>
                       <div className='ms-4'>
                            <span>
                                We use industry-standard technical and organisational safeguards such as:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Encrypted servers
                            </li>
                            <li>
                                Secure data storage
                            </li>
                            <li>
                                Access controls and authentication
                            </li>
                            <li>
                                Regular security audits
                            </li>
                            <li>
                                Monitoring for unauthorized access
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>Despite strong measures, no digital system can guarantee 100% security.</span>
                    </div>

                    {/* 5 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>5. Cookies & Tracking Technologies</span>
                       <div className='ms-4'>
                            <span>
                                Our website may use cookies to:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Improve performance
                            </li>
                            <li>
                                Personalize your browsing experience
                            </li>
                            <li>
                                Show relevant real-estate offers
                            </li>
                            <li>
                                Analyse website traffic patterns
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>You may disable cookies through browser settings, though some website features may be affected.</span>
                    </div>

                    {/* 6 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>6. Your Rights</span>
                       <div className='ms-4'>
                            <span>
                                Depending on applicable law, you may have the right to:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Access your personal information
                            </li>
                            <li>
                                Request correction of inaccurate data
                            </li>
                            <li>
                                Request deletion of your data
                            </li>
                            <li>
                                Withdraw consent for marketing communication
                            </li>
                            <li>
                                Opt-out of promotional SMS or email updates
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>To exercise these rights, contact us at the details provided below.</span>
                    </div>

                    {/* 7 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>7. Data Retention</span>
                       <div className='ms-4'>
                            <span>
                                We retain your information only as long as necessary for:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Providing services
                            </li>
                            <li>
                                Legal or taxation requirements
                            </li>
                            <li>
                                Resolving disputes
                            </li>
                            <li>
                                Maintaining business records
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>Once data is no longer required, it is securely deleted or anonymised.</span>
                    </div>

                    {/* 8 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>8. Third-Party Links</span>
                       <div className='ms-4'>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Our website or promotional materials may include links to third-party websites.
                            </li>
                            <li>
                                BRANDSDOOR Real Estate Pvt. Ltd. is not responsible for the privacy practices, accuracy, or content of these external platforms.
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>Please review their privacy policies before interacting with them.</span>
                    </div>

                    {/* 9 point */}
                    <br />
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>9. Children’s Privacy</span>
                       <div className='ms-4'>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Our services are not intended for individuals under 18 years of age.
                            </li>
                            <li>
                                We do not knowingly collect data from minors.
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>If such information is identified, we will delete it promptly.</span>
                    </div>

                    {/* 10 point */}
                    <br />
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>10. Updates to this Privacy Policy</span>
                       <div className='ms-4'>
                        <span>
                                We may revise this policy from time to time to reflect:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                               Changes in law
                            </li>
                            <li>
                                Business needs
                            </li>
                            <li>
                                Service updates
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>The updated policy will always include a revised “Last Updated” date.</span>
                    </div>

                    {/* 11 point */}
                    <br />
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>11. Contact Us</span>
                       <div className='ms-4'>
                        <span>
                                For any questions, requests, or concerns regarding this Privacy Policy, please contact:
                            </span>
                            <br />
                        <span>
                                BRANDSDOOR Real Estate Pvt. Ltd.
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                               info@indiadealss.com
                            </li>
                            <li>
                                +91 9818763100
                            </li>
                            <li>
                               UNIT No: 320, TOWER C, GOLDEN I, TECHZONE 4, Grater Noida, 201009 
                            </li>
                        </ul>
                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}
