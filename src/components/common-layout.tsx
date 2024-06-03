'use client'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import icons from '@/constants/icons'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useSession } from 'next-auth/react'
import { UserDropdownMenu } from './user-dropdown-menu'

type TitleType =
  | string
  | {
      label: string
      icon: React.ReactNode
    }

interface MobileOptions {
  hasBackButton?: boolean
  hasStars?: boolean
  hasSearch?: boolean
  hasNotifications?: boolean
}

interface CommonLayoutProps extends React.PropsWithChildren {
  title?:
    | string
    | {
        label: string
        icon: React.ReactNode
      }
  hideHeader?: boolean
  mobileOptions?: MobileOptions
}

export function CommonLayout({ title, hideHeader, mobileOptions, children }: CommonLayoutProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const session = useSession()

  const user = session.data?.user.dto

  if (!user) {
    return null
  }

  if (isDesktop) {
    if (hideHeader) return children

    return (
      <>
        <div className="px-[20px]">
          <div className="ml-auto flex h-[60px] w-full items-center justify-end gap-[32px]">
            <BellIcon />

            <div className="flex items-center gap-[8px] rounded-[16px] bg-gray-02 px-[10px] py-[3.5px]">
              <Image src={icons.star} alt="" width={16} height={16} />
              <div className="mt-[3px] text-body2-bold leading-none text-gray-08">{user.point}</div>
            </div>

            <UserDropdownMenu />
          </div>

          {title != null && <Title title={title} />}
        </div>

        {children}
      </>
    )
  }

  const hasRightContent =
    mobileOptions?.hasNotifications || mobileOptions?.hasSearch || mobileOptions?.hasStars

  return (
    <>
      <div className="relative flex h-[48px] items-center px-[20px]">
        {mobileOptions?.hasBackButton && (
          <div className="flex items-center">
            <BackButton />
          </div>
        )}

        {title && <Title title={title} center={mobileOptions?.hasBackButton} />}

        {hasRightContent && (
          <div className="ml-auto flex items-center gap-[16px]">
            {mobileOptions.hasStars && (
              <div className="flex items-center gap-[8px] rounded-[16px] bg-gray-02 px-[10px] py-[3.5px]">
                <Image src={icons.star} alt="" width={16} height={16} />
                <div className="mt-[3px] text-body2-bold leading-none text-gray-08">
                  {user.point}
                </div>
              </div>
            )}
            {mobileOptions.hasSearch && <SearchIcon />}
            {mobileOptions.hasNotifications && (
              <div>
                <BellIcon />
              </div>
            )}
          </div>
        )}
      </div>

      {children}
    </>
  )
}

const Title = ({ title, center }: { title: TitleType; center?: boolean }) => {
  if (title instanceof String) {
    return <h2 className={cn(center && 'center')}>{title}</h2>
  }

  if (title instanceof Object) {
    return (
      <div className={cn('flex items-start gap-[8px] *:shrink-0', center && 'center')}>
        <h2 className="text-h3-bold text-gray-09 lg:text-h2-medium">{title.label}</h2>
        {title.icon}
      </div>
    )
  }
}

const BackButton = () => {
  const router = useRouter()

  return (
    <Button variant="ghost" size="icon" className="ml-[-12px]" onClick={() => router.back()}>
      <ChevronLeftIcon />
    </Button>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1L1 9L9 17"
        stroke="#4B4F54"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="11" r="8" stroke="#4B4F54" strokeWidth="2" />
      <path d="M22 23L15 16" stroke="#4B4F54" strokeWidth="2" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.7481 15.9487L18.7779 7.26891C18.4406 4.26667 16.0176 2 13.138 2H10.7513C7.87165 2 5.44343 4.26667 5.11137 7.26891L4.14112 15.9487L3.1086 17.4798C2.67796 18.1173 3.1086 19 3.86094 19H20.0802C20.8325 19 21.2684 18.0955 20.817 17.458L19.7481 15.9487Z"
        stroke="#4B4F54"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M16 20.1815C16 21.7381 14.2091 23 12 23C9.79086 23 8 21.7381 8 20.1815C8 18.6248 9.79086 19.0543 12 19.0543C14.2091 19.0543 16 18.6248 16 20.1815Z"
        fill="#4B4F54"
      />
    </svg>
  )
}
