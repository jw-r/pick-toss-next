'use client'

import { cn } from '@/lib/utils'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PropsWithChildren, ReactNode, useMemo } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface IconProps {
  isActive: boolean
}

interface NavItem {
  href: string
  Icon: (props: IconProps) => ReactNode
  title: string
  segments: string[][]
}

export const LeftNavLayout = ({ children }: PropsWithChildren) => {
  const segments = useSelectedLayoutSegments()
  const navItems: NavItem[] = useMemo(
    () => [
      {
        href: '/power-up',
        title: '파워업 퀴즈',
        Icon: PowerUpIcon,
        segments: [['power-up']],
      },
      {
        href: '/review',
        title: '복습 체크',
        Icon: ReviewCheckIcon,
        segments: [['review']],
      },
      {
        href: '/repository',
        title: '공부 창고',
        Icon: StudyRepositoryIcon,
        segments: [['repository']],
      },
    ],
    [],
  )

  const activeItem = useMemo(() => findActiveNav(navItems, segments), [navItems, segments])

  return (
    <div className={cn('flex', activeItem && 'pl-[240px]')}>
      {activeItem && (
        <div className="fixed left-0 z-50 flex h-screen w-[240px] flex-col items-center border-r border-gray-04 bg-white p-5">
          <div className="flex items-center gap-[14px]">
            <div className="size-9 rounded-lg bg-gray-04" />
            <LogoIcon />
          </div>
          <div className="mb-[26px] mt-[30px] w-full">
            <Button className="h-[56px] w-full items-center gap-[13.3px] rounded-full bg-[#FB7E20] shadow-lg hover:bg-[#FB7E20]/80">
              <PlusIcon />
              <span className="text-sm">문서 추가하기</span>
            </Button>
          </div>
          <div className="w-full px-[12px]">
            {navItems.map((item) => {
              const { href, Icon, title } = item
              const isActive = activeItem == item
              return (
                <Link key={title} href={href} className="flex h-[64px] items-center gap-4">
                  <Icon isActive={isActive} />
                  <span className={cn('text-gray-40', isActive && 'text-[#FB7E20]')}>{title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

interface SegmentsRecord {
  segments: string[]
  item: NavItem
}

const descendingOrderOfSegments = (recordA: SegmentsRecord, recordB: SegmentsRecord): number =>
  recordB.segments.length - recordA.segments.length

const getIsActiveNav = (currentSegments: string[]) => (record: SegmentsRecord) =>
  record.segments.every((seg, index) => currentSegments[index] === seg)

const findActiveNav = (items: NavItem[], currentSegments: string[]): NavItem | undefined => {
  const segments = items.reduce<SegmentsRecord[]>((result, item) => {
    item.segments.forEach((segments) => {
      result.push({
        segments,
        item,
      })
    })
    return result
  }, [])

  const isActiveSegment = getIsActiveNav(currentSegments)
  return segments.sort(descendingOrderOfSegments).find(isActiveSegment)?.item
}

// TODO: Icon 컴포넌트 구현
function PowerUpIcon({ isActive }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={isActive ? '#FFAB40' : '#A2A6AB'}
    >
      <g clipPath="url(#clip0_2028_62)">
        <path
          d="M12.4548 5.5L10.1748 10.3598H14.4998L11.4998 15.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.785 22.915C7 21 7.915 18.985 7.915 18.985C9.17 19.46 10.55 19.72 12 19.72C17.8 19.72 22.5 15.53 22.5 10.36C22.5 5.19 17.8 1 12 1C6.2 1 1.5 5.19 1.5 10.36C1.5 15.155 5.075 17.215 5.075 17.215"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2028_62">
          <rect width="23" height="23.86" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ReviewCheckIcon({ isActive }: IconProps) {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={isActive ? '#FFAB40' : '#A2A6AB'}
    >
      <g clipPath="url(#clip0_2028_9)">
        <path
          d="M12 13.0002L15.81 16.8102L21.71 10.9102"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 20.5H1V13.275H7V7.5H13V1.5H20V8.86"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2028_9">
          <rect width="23.94" height="21" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function StudyRepositoryIcon({ isActive }: IconProps) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={isActive ? '#FFAB40' : '#A2A6AB'}
    >
      <g clipPath="url(#clip0_2028_36)">
        <path
          d="M1.5 14.97V3.595C1.5 2.435 2.44 1.5 3.595 1.5H16.4C17.56 1.5 18.495 2.44 18.495 3.595V20.37C18.495 21.53 17.555 22.465 16.4 22.465H3.595C2.435 22.465 1.5 21.525 1.5 20.37V18.275H14.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M5.52002 6.40527H14.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2028_36">
          <rect width="19" height="22.97" fill="white" transform="translate(0.5 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function LogoIcon() {
  return (
    <svg width="94" height="24" viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3553 5.51471C12.5813 5.1 11.6904 4.88824 10.7004 4.88824C9.71048 4.88824 8.77453 5.09118 7.91058 5.49706C7.04663 5.90294 6.33566 6.39706 5.75969 6.98823L6.09268 5.1H3.38382L0 24H2.69986L4.96774 11.3735H4.97674C5.13873 10.5353 5.45371 9.80294 5.92169 9.18529C6.40766 8.53235 6.99263 8.03823 7.66759 7.69412C8.34256 7.35 9.01752 7.18235 9.69248 7.18235C10.6374 7.18235 11.4294 7.47353 12.0504 8.05588C12.6713 8.63824 12.9863 9.45 12.9863 10.4824C12.9863 10.8265 12.9503 11.1441 12.8873 11.4353C12.7253 12.3176 12.4013 13.0941 11.9154 13.7647C11.4294 14.4353 10.8444 14.9382 10.1695 15.2912C9.52149 15.6265 8.86453 15.7941 8.18956 15.8118L8.55855 14.3824L4.74275 16.1382L6.35366 18.2735L7.24462 19.4647L7.6046 18.0882C7.82958 18.1147 8.06357 18.1235 8.30656 18.1235C9.4495 18.1235 10.5294 17.8412 11.5644 17.2765C12.5993 16.7118 13.4813 15.9176 14.2012 14.9029C14.9212 13.8882 15.3982 12.7324 15.6322 11.4529C15.7312 10.9588 15.7762 10.4824 15.7762 10.0324C15.7762 8.99118 15.5602 8.08235 15.1372 7.31471C14.7142 6.54706 14.1112 5.93824 13.3373 5.52353L13.3553 5.51471Z"
        fill="#8E8E8E"
      />
      <path
        d="M19.196 0C18.71 0 18.296 0.158824 17.963 0.485294C17.6301 0.811765 17.4681 1.21765 17.4681 1.69412C17.4681 2.17059 17.6301 2.57647 17.963 2.90294C18.296 3.22941 18.71 3.38824 19.196 3.38824C19.682 3.38824 20.0779 3.22941 20.4019 2.90294C20.7259 2.57647 20.8969 2.17059 20.8969 1.69412C20.8969 1.21765 20.7349 0.811765 20.4019 0.485294C20.0689 0.158824 19.664 0 19.196 0Z"
        fill="#8E8E8E"
      />
      <path d="M20.5189 5.09118H17.8191V17.9118H20.5189V5.09118Z" fill="#8E8E8E" />
      <path
        d="M28.9875 7.12059C29.7794 7.12059 30.4364 7.29706 30.9584 7.65882C31.4803 8.02059 31.8583 8.51471 32.0923 9.15H35.0081C34.6392 7.78235 33.9462 6.73235 32.9113 6C31.8763 5.26765 30.5624 4.89706 28.9875 4.89706C27.7365 4.89706 26.6296 5.17059 25.6666 5.70882C24.7037 6.25588 23.9477 7.02353 23.3988 8.02059C22.8498 9.01765 22.5798 10.1824 22.5798 11.4971C22.5798 12.8118 22.8498 13.9765 23.3988 14.9735C23.9477 15.9706 24.7037 16.7471 25.6666 17.3029C26.6296 17.85 27.7365 18.1324 28.9875 18.1324C30.5354 18.1324 31.8313 17.7529 32.8753 16.9853C33.9192 16.2176 34.6302 15.1853 35.0081 13.8794H32.0923C31.5883 15.2294 30.5534 15.9 28.9875 15.9C27.8805 15.9 26.9986 15.5118 26.3416 14.7353C25.6846 13.9588 25.3607 12.8824 25.3607 11.5059C25.3607 10.1294 25.6846 9.05294 26.3416 8.28529C26.9986 7.51765 27.8805 7.13824 28.9875 7.13824V7.12059Z"
        fill="#8E8E8E"
      />
      <path
        d="M44.5746 5.09118L39.8319 10.7029V0.697059H37.132V17.9118H39.8319V12.3971L44.6736 17.9118H48.3274L42.2978 11.5147L48.3274 5.09118H44.5746Z"
        fill="#8E8E8E"
      />
      <path
        d="M53.1512 1.90588H50.4243V5.09118H48.8854V7.25294H50.4243V14.3471C50.4243 15.6 50.7483 16.5088 51.3963 17.0647C52.0442 17.6206 52.9802 17.9029 54.1951 17.9029H56.328V15.6971H54.6631C54.1051 15.6971 53.7181 15.5912 53.4932 15.3794C53.2682 15.1676 53.1512 14.8235 53.1512 14.3471V7.25294H56.328V5.09118H53.1512V1.90588Z"
        fill="#8E8E8E"
      />
      <path
        d="M67.4064 5.7C66.3985 5.15294 65.2645 4.88824 64.0136 4.88824C62.7627 4.88824 61.6287 5.16176 60.6208 5.7C59.6128 6.24706 58.8119 7.01471 58.2269 8.02941C57.6419 9.03529 57.345 10.1912 57.345 11.4971C57.345 12.8029 57.6329 13.9765 58.1999 14.9735C58.7669 15.9706 59.5498 16.7471 60.5488 17.3029C61.5477 17.8588 62.6637 18.1324 63.8966 18.1324C65.1295 18.1324 66.2905 17.8588 67.3254 17.3029C68.3604 16.7559 69.1793 15.9706 69.7823 14.9647C70.3853 13.9588 70.6822 12.8029 70.6822 11.4971C70.6822 10.1912 70.3853 9.03529 69.8093 8.02941C69.2243 7.02353 68.4234 6.24706 67.4154 5.7H67.4064ZM67.3434 13.8618C66.9654 14.5147 66.4705 15 65.8585 15.3265C65.2465 15.6529 64.5986 15.8118 63.9056 15.8118C62.8167 15.8118 61.9077 15.4324 61.1877 14.6824C60.4678 13.9324 60.1078 12.8647 60.1078 11.4882C60.1078 10.5618 60.2788 9.76765 60.6298 9.12353C60.9808 8.47941 61.4487 7.99412 62.0427 7.66765C62.6367 7.34118 63.2846 7.18235 63.9776 7.18235C64.6706 7.18235 65.3185 7.34118 65.9215 7.66765C66.5245 7.99412 67.0014 8.47941 67.3704 9.12353C67.7394 9.76765 67.9194 10.5529 67.9194 11.4882C67.9194 12.4235 67.7304 13.2088 67.3524 13.8618H67.3434Z"
        fill="#8E8E8E"
      />
      <path
        d="M79.8978 11.2235C79.2858 10.9676 78.5118 10.7118 77.5579 10.4647C76.8469 10.2618 76.3069 10.0941 75.947 9.96176C75.578 9.82941 75.272 9.64412 75.02 9.41471C74.768 9.18529 74.642 8.89412 74.642 8.55C74.642 8.11765 74.831 7.76471 75.209 7.5C75.587 7.23529 76.136 7.10294 76.8469 7.10294C77.5579 7.10294 78.1518 7.27059 78.5748 7.61471C78.9978 7.95882 79.2408 8.41765 79.2858 8.98235H81.9856C81.9226 7.71176 81.4367 6.70588 80.5277 5.97353C79.6188 5.24118 78.4218 4.87059 76.9369 4.87059C75.938 4.87059 75.056 5.02941 74.2911 5.35588C73.5261 5.68235 72.9321 6.13235 72.5271 6.69706C72.1132 7.26176 71.9062 7.88824 71.9062 8.56765C71.9062 9.40588 72.1312 10.0765 72.5811 10.5882C73.0311 11.1 73.5621 11.4794 74.1831 11.7265C74.804 11.9735 75.596 12.2294 76.5769 12.4941C77.5849 12.7765 78.3318 13.0324 78.7908 13.2618C79.2498 13.4912 79.4928 13.8529 79.4928 14.3294C79.4928 14.7794 79.2858 15.15 78.8628 15.4324C78.4398 15.7147 77.8549 15.8647 77.0989 15.8647C76.3429 15.8647 75.767 15.6794 75.281 15.3176C74.795 14.9559 74.534 14.4971 74.489 13.9588H71.6902C71.7262 14.7353 71.9782 15.4324 72.4462 16.0676C72.9231 16.6941 73.5621 17.1882 74.3811 17.5588C75.191 17.9206 76.118 18.1059 77.1439 18.1059C78.1698 18.1059 79.0338 17.9471 79.7898 17.6206C80.5457 17.2941 81.1217 16.8441 81.5357 16.2706C81.9496 15.6971 82.1566 15.0441 82.1566 14.3206C82.1386 13.5 81.9136 12.8382 81.4727 12.3441C81.0317 11.85 80.5007 11.4706 79.8978 11.2147V11.2235Z"
        fill="#8E8E8E"
      />
      <path
        d="M93.316 12.3529C92.8751 11.8588 92.3441 11.4794 91.7411 11.2235C91.1382 10.9676 90.3552 10.7118 89.4012 10.4647C88.6903 10.2618 88.1503 10.0941 87.7903 9.96176C87.4214 9.82941 87.1154 9.64412 86.8634 9.41471C86.6114 9.18529 86.4854 8.89412 86.4854 8.55C86.4854 8.11765 86.6744 7.76471 87.0524 7.5C87.4304 7.23529 87.9793 7.10294 88.6903 7.10294C89.4013 7.10294 89.9952 7.27059 90.4182 7.61471C90.8412 7.95882 91.0842 8.41765 91.1292 8.98235H93.829C93.766 7.71176 93.28 6.70588 92.3711 5.97353C91.4621 5.24118 90.2652 4.87059 88.7803 4.87059C87.7813 4.87059 86.8994 5.02941 86.1344 5.35588C85.3695 5.68235 84.7755 6.13235 84.3705 6.69706C83.9565 7.26176 83.7495 7.88824 83.7495 8.56765C83.7495 9.40588 83.9745 10.0765 84.4245 10.5882C84.8745 11.1 85.4055 11.4794 86.0264 11.7265C86.6474 11.9735 87.4394 12.2294 88.4203 12.4941C89.4282 12.7765 90.1752 13.0324 90.6342 13.2618C91.0932 13.4912 91.3361 13.8529 91.3361 14.3294C91.3361 14.7794 91.1292 15.15 90.7062 15.4324C90.2832 15.7147 89.6982 15.8647 88.9423 15.8647C88.1863 15.8647 87.6103 15.6794 87.1244 15.3176C86.6384 14.9559 86.3774 14.4971 86.3324 13.9588H83.5336C83.5696 14.7353 83.8215 15.4324 84.2895 16.0676C84.7665 16.6941 85.4055 17.1882 86.2244 17.5588C87.0344 17.9206 87.9613 18.1059 88.9873 18.1059C90.0132 18.1059 90.8772 17.9471 91.6331 17.6206C92.3891 17.2941 92.9651 16.8441 93.379 16.2706C93.793 15.6971 94 15.0441 94 14.3206C93.982 13.5 93.757 12.8382 93.316 12.3441V12.3529Z"
        fill="#8E8E8E"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2563 0V20" stroke="#F6FAFD" strokeWidth="2" />
      <path d="M20.5132 10L0.000361264 10" stroke="#F6FAFD" strokeWidth="2" />
    </svg>
  )
}
