import Image from 'next/image'
import trash from "@/public/images/trash.png"
import circle from "@/public/images/circle.png"
import fill from "@/public/images/fill.png"
import back from "@/public/images/return.png"

export default function Home() {
  return (
    <main className="flex flex-col items-center my-20 m-auto gap-8 max-w-[1024px] w-full">
      <div className='flex flex-row gap-8 items-start w-full'>
        <div className='flex border rounded-lg flex-col gap-4 p-3 w-[calc(66%-16px)]'>
          <span className='text-lg font-bold'>افزودن تسک جدید</span>
          <div className='flex gap-2'>
            <input className='border border-neutral-400 rounded-md p-1 w-full' placeholder='امروز میخوام...' />
            <button className='rounded-md bg-purple-900 px-4 py-1 text-white'>افزودن</button>
          </div>
        </div>
        <div className='flex border rounded-lg flex-col gap-4 p-3 w-[calc(33%-16px)]'>
          <span className='text-base font-bold'>گزارش موفقیت</span>
        </div>
      </div>
      <div className='flex border rounded-lg flex-col gap-4 p-3 w-full'>
        <span className='text-lg font-bold'>درحال انجام</span>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center [&:not(:last-child)]:border-b p-3'>
            <div className='flex gap-2 items-center'>
              <Image className='' src={circle} alt='circle icon' width={16} height={16} />
              <span className=''>انجام تسک اول</span>
            </div>
            <div className='rounded-[4px] border size-6 flex items-center justify-center'><Image src={trash} alt='trash icon' width={16} height={16} /></div>
          </div>
          <div className='flex justify-between items-center [&:not(:last-child)]:border-b p-3'>
            <div className='flex gap-2 items-center'>
              <Image className='' src={circle} alt='circle icon' width={16} height={16} />
              <span className=''>انجام تسک اول</span>
            </div>
            <div className='rounded-[4px] border size-6 flex items-center justify-center'><Image src={trash} alt='trash icon' width={16} height={16} /></div>
          </div>
          <div className='flex justify-between items-center [&:not(:last-child)]:border-b p-3'>
            <div className='flex gap-2 items-center'>
              <Image className='' src={circle} alt='circle icon' width={16} height={16} />
              <span className=''>انجام تسک اول</span>
            </div>
            <div className='rounded-[4px] border size-6 flex items-center justify-center'><Image src={trash} alt='trash icon' width={16} height={16} /></div>
          </div>
        </div>
        <div className='bg-neutral-200 p-2 rounded-md flex items-center justify-between'>
          <p className='text-neutral-800 text-sm'>00:09 ثانیه برای بازگرداندن فرصت دارید</p>
          <div className='bg-neutral-400 rounded-md p-1'><Image src={back} alt="return icon" width={14} height={14}></Image></div>
        </div>
      </div>
      <div className='flex border rounded-lg flex-col gap-4 p-3 w-full'>
        <span className='text-lg font-bold'>انجام شده</span>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center [&:not(:last-child)]:border-b p-3'>
            <div className='flex gap-2 items-center'>
              <Image src={fill} alt='circle-fill icon' width={16} height={16} />
              <span className='line-through'>انجام تسک اول</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
