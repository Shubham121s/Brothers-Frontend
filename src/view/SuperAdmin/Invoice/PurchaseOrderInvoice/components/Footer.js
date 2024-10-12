import React from 'react'
const Footer = () => {
  return (
    <div>
      <small className="mb-0">Terms & Conditions apply*</small>
      <div className="flex justify-between">
        <div className="print:hidden">
          <small className="italic">
            Invoice was created on a computer and is valid without the signature
            and seal.
          </small>
        </div>
        <div></div>
        <div>
          <small className="italic">signature and seal.</small>
        </div>
      </div>
      <div
        className="flex items-center mt-4 justify-center print:text-xs"
        style={{ marginTop: '100px' }}
      >
        <strong
          className="text-gray-600"
          style={{ height: '13px' }}
        >
          ******************
        </strong>
        <strong className="text-gray-600 uppercase">
          This Is An Electronically Generated Report
        </strong>
        <strong
          className="text-gray-600"
          style={{ height: '13px' }}
        >
          ******************
        </strong>
      </div>
      {/* <div className='text-center text-xs flex gap-4 justify-center'>
                <p>Developed By <ActionLink href='https://www.5techg.com' target='_blank'>5TechG Lab LLP</ActionLink></p>
                <div className='text-xs'>Contact us: +91 7028828831</div>
            </div> */}
    </div>
  )
}

export default Footer
