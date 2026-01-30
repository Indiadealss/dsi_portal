import React from 'react'
import privacy from '../../Images/privacy.shared.png'

export default function Chanel() {


    return (
        <>
            <div className='px-[22%] my-10'>
                <p><span className='text-sm'> Home > About us</span></p>
                <div className='bg-blue-50  py-5 rounded-lg mt-3'>
                    <img src={privacy} alt='...' className='w-[4%] mx-auto' />
                    <h2 className='text-center mt-3'><span className='text-center'>Channel Partner Policy</span></h2>
                </div>

                {/* privacy polocy */}

                <div className='mt-5'>
                    <h4><span>BRANDSDOOR Real Estate Pvt. Ltd.</span></h4>
                    <p className='mt-5' style={{ lineHeight: '1.2', fontWeight: '400' }}>
                        <span className='text-sm' style={{ fontWeight: '400', lineHeight: '0' }}>
                            This Refund & Cancellation Policy outlines the terms under which payments, bookings, or service charges made through DSI Indiadealss Real Estate Pvt. Ltd. (“Company”, “we”, “our”, “us”) may be cancelled or refunded. By using our services, you agree to the conditions mentioned below.
                            <br />
                            <br />
                        </span></p>

                    {/* 1 point */}
                    <div>
                        <span className='text-lg font-medium'>1. General Policy</span>
                        <div className='ms-2'>
                            <span className=''>
                                <span className='ps-2 mt-5'>All refunds and cancellations are processed based on:</span>
                                <br />
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        The type of service availed
                                    </li>
                                    <li>
                                        Developer/Builder policies
                                    </li>
                                    <li>
                                        Company’s internal guidelines
                                    </li>
                                    <li>
                                        Applicable legal regulations
                                    </li>
                                </ul>
                                <span>
                                    Each project or service may have different refund conditions, and those specific terms shall prevail where applicable.
                                </span>

                            </span>

                        </div>
                    </div>

                   {/* 2 point */}
                    <div>
                        <br />
                        <span className='text-lg font-medium'>2. Booking Amount / EOI (Expression of Interest)</span>
                        <div className='ms-2'>
                            <span className=''>
                                <br />
                                <span className='font-medium'>A. Non-Refundable Situations</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        In most real estate transactions:
                                    </li>
                                    <li>
                                        EOI,
                                    </li>
                                    <li>
                                        Token amount, or
                                    </li>
                                    <li>
                                        Initial booking payments
                                    </li>
                                    <li>
                                        Identity details (PAN, Aadhaar, if required for verification or KYC)
                                    </li>
                                    <li>
                                        Property preferences or buying requirements
                                    </li>
                                </ul>
                                <span>
                                    Are non-refundable, unless otherwise specified by the developer or the Company.
                                </span>
                            </span>
                            <br />
                            <br />
                            <span>

                                <span className='font-medium'>B. Refund in Special Cases</span>
                                <br />
                                <span>
                                    A refund may be considered only if:
                                </span>
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        The project or unit becomes unavailable after payment
                                    </li>
                                    <li>
                                        The developer cancels or significantly alters the project
                                    </li>
                                    <li>
                                        Company or developer agrees in writing to process a refund
                                    </li>
                                </ul>
                                <span>
                                    All such refunds are processed strictly according to developer policies.
                                </span>

                            </span>

                        </div>
                    </div>
                    

                    {/* 3 point */}
                    <br />
                    <div>
                        <span className='text-lg font-medium'>3. Cancellation by Customer</span>
                        <div className='ms-2'>
                            <span className=''>
                                
                                <span className='ps-2'>If a customer chooses to cancel a booking:</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        The Company is not liable to provide a refund for booking amounts or tokens already paid.
                                    </li>
                                    <li>
                                        All cancellation terms and refund amounts (if any) will depend on the respective developer’s policy.
                                    </li>
                                </ul>

                            </span>
                            <br />
                            <br />
                            <span>

                                <span className='font-medium'>Any refund (if approved) may be subject to deductions such as:</span>
                                <br />
                                <ul className="mt-2 ms-3 list-disc pl-5 text-sm leading-7">
                                    <li>
                                        Processing fees
                                    </li>
                                    <li>
                                        Administrative charges
                                    </li>
                                    <li>
                                        Developer cancellation penalties
                                    </li>
                                    </ul>

                            </span>


                        </div>
                    </div>

                    {/* 4 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>4. Cancellation by Developer / Third Parties</span>
                       <div className='ms-4'>
                            <span>
                                If the developer cancels the project or alters the offering in a major way:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Refunds will be issued as per the developer’s official guidelines.
                            </li>
                            <li>
                                The Company will assist in coordination but is not responsible for delays caused by developers or payment gateways.
                            </li>
                        </ul>
                       </div>
                    </div>

                    {/* 5 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>5. Service Charges / Consultation Fees</span>
                       <div className='ms-4'>
                            <span>
                                Any service charges paid to the Company for:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Consultancy
                            </li>
                            <li>
                                Documentation
                            </li>
                            <li>
                                Marketing services
                            </li>
                            <li>
                                Administrative support
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>are non-refundable, unless explicitly stated in writing.</span>
                    </div>

                    {/* 6 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>6. Transaction Failures</span>
                       <div className='ms-4'>
                            <span>
                               In case of:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Payment gateway failures
                            </li>
                            <li>
                                Double payments
                            </li>
                            <li>
                                Technical errors
                            </li>
                        </ul>
                       </div>
                        <span className=''>Refunds will be processed only after receiving confirmation from the payment processor.</span>
                        <br />
                        <span>Refund timeline: 5–14 working days, depending on the bank/payment channel.</span>
                    </div>

                    {/* 7 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>7. Mode of Refund</span>
                       <div className='ms-4'>
                            <span>
                                If a refund is approved:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                It will be issued only to the original payment method (bank transfer, UPI, card, etc.).
                            </li>
                            <li>
                                No cash refunds will be provided.
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>The customer must provide accurate bank details for processing.</span>
                    </div>

                    {/* 8 point */}
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>8. Processing Time</span>
                       <div className='ms-4'>
                        <span>
                            Refund processing time depends on:
                        </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Verification of the transaction
                            </li>
                            <li>
                                Developer approval
                            </li>
                            <li>
                                Bank and payment gateway timelines
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>Typical processing time: 7–21 working days (may vary by project or developer policy).</span>
                    </div>

                    {/* 9 point */}
                    <br />
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>9. No Refund for Change of Mind</span>
                       <div className='ms-4'>
                        <span>
                            Refunds will not be issued for:
                        </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                                Loss of interest in the property
                            </li>
                            <li>
                                Personal financial issues
                            </li>
                            <li>
                                Delayed site visits or documentation
                            </li>
                            <li>
                                Customers changing their preference after booking
                            </li>
                        </ul>
                       </div>
                    </div>

                    {/* 10 point */}
                    <br />
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>10. Documentation Required for Refund Requests</span>
                       <div className='ms-4'>
                        <span>
                                Customers must submit:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                               Payment receipt
                            </li>
                            <li>
                                Booking form or EOI document
                            </li>
                            <li>
                                Bank details for refund
                            </li>
                            <li>
                                Identity proof
                            </li>
                            <li>
                                Written request for cancellation
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>Without required documents, refund cannot be initiated.</span>
                    </div>


                    {/* 11 point */}
                    <br />
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>11. Company Liability</span>
                        <br />
                        <span>
                            BRANDSDOOR Real Estate Pvt. Ltd. acts as an intermediary between customers and developers.
                        </span>
                       <div className='ms-4'>
                        <span>
                                Therefore:
                            </span>
                             <ul className="mt-2  list-disc pl-5 text-sm leading-8">
                            <li>
                               Payment receipt
                            </li>
                            <li>
                                Booking form or EOI document
                            </li>
                            <li>
                                Bank details for refund
                            </li>
                            <li>
                                Identity proof
                            </li>
                            <li>
                                Written request for cancellation
                            </li>
                        </ul>
                       </div>
                        <span className='ms-1'>Our liability is limited to the extent of services provided directly by us.</span>
                        <br />
                        <span className='ms-1'>We do not hold responsibility for developer-approved deductions or refund delays.</span>
                    </div>

                    {/* 12 point */}
                    <br />
                    <br />
                    <div>
                        <br />
                        <span className='text-lg font-medium'>12. Contact Information</span>
                       <div className='ms-4'>
                        <span>
                                For refund-related queries, reach us at:
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
