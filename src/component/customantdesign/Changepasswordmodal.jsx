import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Changepasswordmodal = ({open , setOpen,currentbtn,setCurrentBtn}) => {

  
  

  return (
    <>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div className='flex w-full border-b border-gray-300 m-0 p-0 '>
          <p className='px-2 border-e border-gray-100 cursor-pointer' onClick={() => setCurrentBtn('opt')}><span className={currentbtn === 'opt' ? 'font-normal text-xs text-blue-500':'font-normal text-xs text-gray-500 '}>Opt out Dealer Response</span></p>
          <p className='px-2 border-e border-gray-100 cursor-pointer' onClick={() => setCurrentBtn('settingMyLead')} ><span className={currentbtn === 'settingMyLead' ? 'font-normal text-xs text-blue-500':'font-normal text-xs text-gray-500 '}>Settings for My Leads</span></p>
          <p className='px-2 border-e border-gray-100 cursor-pointer' onClick={() => setCurrentBtn('changePassword')}><span className={currentbtn === 'changePassword' ? 'font-normal text-xs text-blue-500':'font-normal text-xs text-gray-500 '}>Change Password</span></p>
        </div>

        {/* new password and conform password */}

        <div className={currentbtn === 'changePassword' ? 'mt-5' : 'hidden'}>
          <div>
            <label>New Password<sup className='text-red-700 ps-1'>*</sup></label>
            <input type="text" className='border border-gray-300 bg-white ms-8 outline-none rounded' />
          </div>

          <div className='mt-5'>
            <label>Confirm Password<sup className='text-red-700 ps-1'>*</sup></label>
            <input type="text" className='border border-gray-300 bg-white ms-2 outline-none rounded' />
          </div>
        </div>

        {/* opt out Dealer Response */}
        <div className={currentbtn === 'opt' ? 'mt-5' : 'hidden'}>
          <p className='my-1'><span className='text-gray-500 font-medium text-xs'>You can choose not to recive dealer queires</span></p>
          <p className='my-1'><span className='text-gray-800'>Opt out Dealer Response</span></p>
          <p className='my-1'><span className='text-gray-500 text-xs font-medium'>You can choose to not receive responses we have identified as dealers. Please note that dealers will still be able to call you or query on your property, you simply will not see them</span></p>

          <p><span>Don't send me response via</span></p>
          <div className='mt-2'>
            <input type="checkbox" id='sms' />
            <label for="sms" className='cursor-pointer'>SMS</label>
          </div>
          <div>
            <input type="checkbox" id='emails' />
            <label for="emails" className='cursor-pointer'>Emails</label>
          </div>
          <div>
            <input type="checkbox" id='myindiadeals' />
            <label for="myindiadeals" className='cursor-pointer'>MyINDIADEALSS</label>
          </div>
        </div>

        {/* setting for My Leads */}
        <div className={currentbtn === 'settingMyLead' ? 'mt-5' : 'hidden'}>
          <p><span className='text-xs font-normal'>Subscribe to Email or SMS</span></p>
          <div>
          <input type="checkbox" id='sms' className='outline-none' />
          <label for="sms" className='ps-2'>SMS</label><br />
          <label className='ps-8 text-gray-500'>Contact details of users will be send over sms</label>
          </div>
          <div>
            <input type="checkbox" id='emails' />
            <label for="emails">Emails</label><br />
            <label className='ps-8 text-gray-500'>Contact and property/project details will be sent over email</label>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Changepasswordmodal;