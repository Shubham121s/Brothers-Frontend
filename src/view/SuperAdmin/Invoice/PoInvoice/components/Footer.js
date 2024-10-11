import React from 'react'
const Footer = ({ data }) => {
  const notes = JSON.parse(data?.Note?.notes)
  var points = data.Condition?.condition
  return (
    <div className="print:text-xs">
      <div>
        <strong>{data?.Note?.name}</strong>
        <div className="grid grid-cols-2">
          {notes?.map((n, index) => (
            <div
              key={index}
              className="flex justify-between"
            >
              <small>
                {index + 1}. <strong>{n.label}:</strong>{' '}
                <span>{n.value || '-'}</span>
              </small>
              <br />
            </div>
          ))}
        </div>
      </div>
      <hr />

      <div>
        <strong>{data?.Condition?.name}</strong>
        <div className="flex flex-col print:text-sm">
          <div className="flex justify-between">
            <div dangerouslySetInnerHTML={{ __html: points }}></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between print:text-xs">
        <div className="print:hidden">
          <small className="italic">
            Invoice was created on a computer and is valid without the signature
            and seal.
          </small>
        </div>
        <div></div>
        {/* <div>
          <small className="italic">signature and seal.</small>
        </div> */}
      </div>
      <div className="flex items-center mt-4 justify-center print:text:xs">
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
